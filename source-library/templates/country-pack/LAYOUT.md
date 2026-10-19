# Country source-pack template

Use this layout for a national source pack. Keep any country-specific EU-language files, accepted national material, and unaccepted candidates in separate locations.

```text
<country>/
├── documents/                    # Reviewed national sources only
│   ├── legislation/
│   ├── guidance/
│   ├── forms/
│   ├── case_law/
│   ├── oversight/
│   └── procedure/
├── candidates/                   # Captured, unaccepted national source material
│   ├── legislation/
│   ├── guidance/
│   ├── forms/
│   ├── case_law/
│   ├── oversight/
│   ├── procedure/
│   └── discovery/                # Indexes, search pages, and textless portals
├── references/
│   ├── candidate-manifest.json   # Canonical machine-readable inventory
│   ├── source-list.md            # Human-readable view of that inventory
│   ├── capture-ledger.json       # Retrieval and conversion evidence
│   └── sustainability-assessment.md
├── scripts/                      # Source-specific sync/verify tools, when needed
├── README.md
└── SKILL.md                      # Only when an operational skill uses this pack
```

An EU-language mirror is optional. Add `<country>/core/` only when it contains actual official EU-publisher files in a language-specific representation:

```text
<country>/core/
├── README.md                     # Describes the files actually present
├── eu/
├── case_law/
│   ├── notes/
│   └── full_text/
└── guidance/
    ├── notes/
    └── handbooks/
```

## Placement rules

- The library-level `source-library/core/` is the canonical English EU corpus and is available to every country pack. Do not duplicate its English files in country folders.
- Create a country's optional `core/` only alongside actual, retrieved official EU-publisher representations in another language. Its `README.md` describes those files. Do not create empty `core/` folders, coverage-only README stubs, or placeholder folders for unavailable translations.
- English is an official language in Ireland and Malta, and the shared English corpus already serves their English-language EU material; neither needs country-specific English files. Add Irish or Maltese representations only if the plugin needs them and actual official files are available. For other countries, add only language-specific EU representations that are actually held in the library. A country `core/` never contains that country's national legislation, guidance, or decisions.
- `documents/` is for national material that has passed the pack's documented source review. Use the source-type folders; do not mix sources by discovery pass or retrieval method.
- `candidates/` contains unaccepted captures and conversions. Organize it by source type. Put catalogues, search surfaces, and textless portals under `discovery/`. Do not create parallel `monitor-candidates/` trees.
- `references/candidate-manifest.json` is the canonical inventory. The source list is its human-readable counterpart. Keep retrieval evidence, legal-currentness review, scope, and sustainability findings distinct.
- Keep raw response bytes, temporary conversion output, and pending updates in the repository's configured temporary workspace, not in a country `work/` folder, unless a documented source-specific requirement justifies a committed artifact.
- `scripts/` is optional for inventory-only packs. Put any pack-specific scripts there rather than at the pack root.
- `SKILL.md` is optional. Add it only when a maintained operational workflow uses the pack; a candidate inventory alone is not a runnable skill.

## Template files

Copy and complete the adjacent `README.template.md`, `SKILL.template.md` (if applicable), and reference templates. Remove placeholders and unused empty folders before treating a pack as complete.
