# Austria Legalize conversion rules

## `legalize-at-ris-consolidated-v1`

Applies only to the verified full consolidated Informationsfreiheitsgesetz (IFG), RIS Gesetzesnummer 20012537, Legalize file `at/AT-20012537.md`.

1. Resolve the current RIS consolidation page and confirm the statute number, title, in-force status, displayed consolidation date, and amendment list.
2. Retrieve the Legalize file from a pinned commit. Record repository, file path, commit, Git blob SHA, and snapshot metadata.
3. Remove the Legalize YAML frontmatter and generated top-level heading from the body; record provenance and attribution in the local document header.
4. Remove only the standalone repeated display label consisting of “Abkürzung” followed by “IFG”. Do not remove or rewrite legal text, substantive headings, preamble, paragraph numbering, references, notes, punctuation, or amendment language. No translation or editorial normalization is allowed.
5. Compare every section body against the current official RIS section pages or accepted official RIS captures. For this IFG snapshot, §§ 1–20 matched 20/20 after this label removal and Markdown/whitespace normalization only.
6. Record RIS as the authoritative publisher and attribute the source data to RIS/Bundeskanzleramt under CC BY 4.0. The Legalize pipeline’s MIT license is separate from the legal text/data license.
7. If any section, amendment, statute identity, or current-version check differs, do not refresh or promote the local copy until the discrepancy is resolved. Recheck against RIS on every Legalize snapshot update.

This is a single-source rule. It does not authorize conversion or acceptance of other Austrian Legalize statutes without separate identity, current-version, complete-text, and official-body comparisons.
