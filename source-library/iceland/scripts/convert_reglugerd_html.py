#!/usr/bin/env python3
"""Convert Icelandic Reglugerðasafn HTML legal text to reviewable Markdown.

The converter intentionally accepts only the three reviewed 2026 amendments
listed below. It preserves Icelandic wording and article order, while mapping
HTML headings, paragraphs, emphasis and ordered-list markers to Markdown.
"""

from __future__ import annotations

import argparse
import hashlib
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path


SOURCES = {
    "is-30": {
        "instrument": "Reglugerð nr. 669/2026",
        "url": "https://www.reglugerd.is/reglugerdir/allar/nr/0669-2026",
        "published": "2026-06-11",
        "filename": "is-30-669-2026-amendment.md",
    },
    "is-31": {
        "instrument": "Reglugerð nr. 724/2026",
        "url": "https://www.reglugerd.is/reglugerdir/eftir-raduneytum/dmr/nr/25017",
        "published": "2026-06-26",
        "filename": "is-31-724-2026-amendment.md",
    },
    "is-32": {
        "instrument": "Reglugerð nr. 725/2026",
        "url": "https://www.reglugerd.is/reglugerdir/eftir-raduneytum/dmr/nr/25018",
        "published": "2026-06-26",
        "filename": "is-32-725-2026-amendment.md",
    },
}


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Node | str] = field(default_factory=list)


class DocumentParser(HTMLParser):
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.stack[-1].children.append(Node(tag, {key: value or "" for key, value in attrs}))

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        if data:
            self.stack[-1].children.append(data)


def class_names(node: Node) -> set[str]:
    return set(node.attrs.get("class", "").split())


def walk(node: Node):
    yield node
    for child in node.children:
        if isinstance(child, Node):
            yield from walk(child)


def plain_text(node: Node) -> str:
    return "".join(child if isinstance(child, str) else plain_text(child) for child in node.children)


def normalized_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def inline(node: Node) -> str:
    pieces: list[str] = []
    for child in node.children:
        if isinstance(child, str):
            pieces.append(child)
            continue
        if child.tag == "br":
            pieces.append("\n")
            continue
        rendered = inline(child)
        if child.tag in {"em", "i"}:
            rendered = f"*{rendered}*"
        elif child.tag in {"strong", "b"}:
            rendered = f"**{rendered}**"
        pieces.append(rendered)
    value = "".join(pieces)
    value = re.sub(r"[ \t\xa0]*\n[ \t\xa0]*", "\n", value)
    return "\n".join(normalized_text(line) for line in value.split("\n"))


def alpha_marker(number: int) -> str:
    result = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        result = chr(97 + remainder) + result
    return result


def render_list(node: Node, depth: int = 0) -> list[str]:
    style = node.attrs.get("type", "") or re.search(r"list-style-type\s*:\s*([^;]+)", node.attrs.get("style", ""), re.I)
    style = style.group(1).strip().lower() if hasattr(style, "group") else style.lower()
    try:
        number = int(node.attrs.get("start", "1"))
    except ValueError:
        number = 1
    lines: list[str] = []
    indent = "  " * depth
    for child in node.children:
        if not isinstance(child, Node) or child.tag != "li":
            continue
        marker = alpha_marker(number) if style in {"lower-alpha", "lower-latin"} else str(number)
        number += 1
        content: list[str] = []
        for item in child.children:
            if isinstance(item, str):
                content.append(item)
            elif item.tag == "ol":
                continue
            else:
                content.append(inline(item))
        text = normalized_text("".join(content))
        lines.append(f"{indent}{marker}) {text}")
        for nested in (item for item in child.children if isinstance(item, Node) and item.tag in {"ol", "ul"}):
            lines.extend(render_list(nested, depth + 1))
    return lines


def render_block(node: Node) -> list[str]:
    if node.tag == "h1":
        text = inline(node)
        return [f"# {text}"] if text else []
    if node.tag == "h3" and "article__title" in class_names(node):
        text = inline(node)
        return [f"## {text}"] if text else []
    if node.tag == "p":
        text = inline(node)
        return [text] if text else []
    if node.tag in {"ol", "ul"}:
        return render_list(node)
    if node.tag == "div" and "signature" in class_names(node):
        result: list[str] = []
        def collect(node: Node) -> None:
            for child in node.children:
                if not isinstance(child, Node):
                    continue
                if child.tag == "p":
                    result.extend(render_block(child))
                elif child.tag == "div":
                    collect(child)

        collect(node)
        return result
    return []


def convert(source_id: str, input_path: Path, output_path: Path, checked_at: str) -> None:
    if source_id not in SOURCES:
        raise SystemExit(f"Unsupported source id: {source_id}")
    config = SOURCES[source_id]
    raw = input_path.read_bytes()
    parser = DocumentParser()
    parser.feed(raw.decode("utf-8"))
    parser.close()

    boxbody = next((node for node in walk(parser.root) if node.tag == "div" and "boxbody" in class_names(node)), None)
    if boxbody is None:
        raise SystemExit("Could not find official .boxbody content")
    external_id = next((normalized_text(plain_text(node)) for node in walk(boxbody) if node.tag == "span" and "externalid" in class_names(node)), None)
    if external_id != config["instrument"].replace("Reglugerð nr. ", ""):
        raise SystemExit(f"Official page instrument id mismatch: {external_id!r}")

    blocks: list[str] = []
    saw_title = False
    for child in boxbody.children:
        if not isinstance(child, Node):
            continue
        if child.tag == "div" and "rinfo" in class_names(child):
            continue
        if child.tag == "div" and "buttons" in class_names(child):
            break
        if child.tag == "p" and "meta" in class_names(child):
            continue
        rendered = render_block(child)
        if rendered:
            blocks.extend(rendered)
            if child.tag == "h1":
                saw_title = True
    if not saw_title or not any(line.startswith("## ") for line in blocks):
        raise SystemExit("Official legal title or article text was not found")

    digest = hashlib.sha256(raw).hexdigest()
    heading = f"# {config['instrument']} — amendment to Regulation 540/2017"
    metadata = [
        f"> **Source copy and attribution:** Ministry of Justice, Iceland, {config['instrument']} (original Icelandic text), published in *Stjórnartíðindi B deild* on {config['published']}. Retrieved {checked_at} from [Reglugerðasafn]({config['url']}).",
        "> **Text status:** Complete published amendment text. This is not a consolidated version of Regulation 540/2017.",
        "> **Reuse basis:** Icelandic Copyright Act No. 73/1972, Article 9 (official legal and government documents are not protected by copyright). Attribution is retained; this does not assert a reuse licence for the website or its other content.",
        f"> **Conversion record:** Extracted from the official HTML record; source HTML SHA-256 `{digest}`. See `references/conversion-rules.json`.",
    ]
    content = "\n\n".join([heading, *metadata, "## Published Icelandic text", *blocks]) + "\n"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8", newline="\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-id", required=True, choices=sorted(SOURCES))
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--checked-at", default="2026-10-31")
    args = parser.parse_args()
    convert(args.source_id, args.input, args.output, args.checked_at)


if __name__ == "__main__":
    main()
