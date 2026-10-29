# Country source-pack template

Use this layout for a national source pack. Keep shared EU-language material, reviewed national material, and local-only research records distinct. Store the shared EU-language corpus once under the library-level `source-library/core/` and reference it from country packs.

```text
<country>/
├── documents/                    # Reviewed source text and maintained source-reference notes
│   ├── legislation/
│   ├── guidance/
│   ├── forms/
│   ├── case_law/
│   ├── oversight/
│   ├── procedure/
│   ├── references/                # Final scoped source notes, not publisher-text copies
│   └── discovery/                 # Final discovery notes or structured official-directory data
├── references/
│   ├── candidate-manifest.json   # Canonical machine-readable source inventory
│   ├── source-identity-inventory.json # Canonical identities and representation links
│   ├── source-acceptance.json    # Acceptance states and identity links
│   ├── source-rules.json         # Optional local-copy and monitoring rules
│   ├── source-list.md            # Human-readable view of that inventory
│   ├── capture-ledger.json       # Optional source metadata with local archive references
│   ├── shared-core.json          # References to shared EU-language files, when applicable
│   └── sustainability-assessment.md
├── scripts/                      # Source-specific sync/verify tools, when needed
├── README.md
└── SKILL.md                      # Only when an operational skill uses this pack
```

An EU-language corpus is optional. Keep one canonical local copy of each acquired representation in the shared library, organized by language, and reference it from country packs. `references/shared-core.json` lists source IDs through the library-level language index. Do not create a country-local `core/` directory. Put official representations that are not held locally in `external_only_references`, with the official URL, a null local path, and an explicit external-only state; do not create an empty language folder or imply that a link is a stored copy. For example:

The candidate manifest preserves each existing entry ID and stores `source_identity_id` plus stable `representation_ids`. Link and local-copy records, languages, and editions are representations of a source; do not count them as separate sources. Acceptance and discovery statuses remain attached to the source identity. Keep the inventory sidecar and the managed crosswalk in `source-list.md` synchronized. Leave ambiguous identity matches explicit until evidence resolves them.

```text
source-library/core/de/           # Canonical German EU-language corpus, shared by Austria, Germany, and others
├── eu/
├── case_law/
│   ├── notes/
│   └── full_text/
└── guidance/
    ├── notes/
    └── handbooks/

<country>/references/shared-core.json  # Lists the language index and source IDs used by this country pack
```

## Placement rules

- The library-level `source-library/core/` contains the canonical EU corpus. English files directly under `core/eu/`, `core/case_law/`, and `core/guidance/` are shared with every country pack; do not duplicate them in country folders.
- Store a given official EU-language representation once under `source-library/core/<language-code>/`, even when several jurisdictions use that language. Each country pack records source IDs and canonical paths in `references/shared-core.json`; do not duplicate the files or use filesystem symlinks. For an external-only reference, include the official URL and mark the local path absent until the source bytes are acquired and reviewed.
- English is an official language in Ireland and Malta, and the shared English corpus already serves their English-language EU material; neither needs country-specific copies. Add Irish or Maltese representations under the library-level `source-library/core/` only if the plugin needs them and actual official files are available. For other countries, add only language-specific EU representations that are actually held in the shared library. National legislation, guidance, forms, and decisions belong in `documents/` after review.
- `documents/` holds reviewed national source text and explicitly maintained source-reference notes or discovery outputs. Keep publisher-text copies in the relevant source-type folder. Use `documents/references/` for final scoped notes that identify an official source and its limits without reproducing its text; use `documents/discovery/` only for final reviewed discovery notes or structured official-directory outputs. These maintained artifacts must have a source ID, status, scope, provenance, and a register entry. A local source-text copy is optional: a human-reviewed official URL can support topic evidence without a saved copy. Record ordinary link-only references in the inventory; do not create placeholder files.
- Unaccepted source leads, candidate conversions, raw or derived captures, and transient discovery results belong in the EU Source Update Monitor's indexed local-only archive, not in `documents/references/` or `documents/discovery/`. An uncaptured official lead remains in the source inventory; it is not a failed or unusable source.
- `references/candidate-manifest.json` is the canonical source inventory, not a store for source files. The source list is its human-readable counterpart. `references/source-rules.json` records discovery, retrieval, and conversion methods. An existing capture ledger may keep source-specific retrieval metadata and local archive references, but the Monitor archive index remains authoritative for local research provenance and file hashes. Keep source acceptance, legal-currentness review, topic coverage, and sustainability findings distinct.
- Keep transient downloads, scratch conversion output, and atomic-write staging files in the repository's configured temporary workspace, then remove them after the action. Do not commit disposable intermediates. A local copy of an accepted source belongs under `documents/` only when the pack has selected and reviewed it for use.
- `scripts/` is optional for inventory-only packs. Put any pack-specific scripts there rather than at the pack root.
- `SKILL.md` is optional. Add it only when a maintained operational workflow uses the pack; a candidate inventory alone is not a runnable skill.

## Template files

Copy and complete the adjacent `README.template.md`, `SKILL.template.md` (if applicable), and reference templates, including the candidate manifest, source identity inventory, and acceptance link map. Use `source-rules.template.json` when source-specific acquisition rules are needed. Add `shared-core.template.json` when the pack references shared or external-only EU-language representations. Remove placeholders and unused empty folders before treating a pack as complete.
