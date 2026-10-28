# Country source acceptance overview

**Snapshot date:** 28 October 2026
**Source-library default-branch commit:** `5797731ce01d001ad09c8c371978b17cfb1ca227`

This is a derived cross-country report from the 31 national-pack acceptance registers. Each linked pack register remains authoritative for its own source decisions. The country inventory remains in that pack's canonical machine-readable manifest or register, with its human-readable source list where maintained; this report does not replace either.

## Counting rules

- **Accepted official-reference entries** count source references the pack explicitly accepts for official-link use. Narrow-scope and historical references remain included with their recorded limits. Pending, not-relied-upon, discovery-only, and metadata-only entries are excluded.
- **Accepted local artifacts** count items the pack acceptance register marks as locally accepted. This includes stored official text and, where the register accepts them, authored source summaries. It is not a count of verbatim copies alone.
- The columns are separate acceptance dimensions. A source can appear in both. Do not add them to infer distinct sources. A matching-ID overlap is reported only where both accepted ID sets can be reconciled.
- `—` means the register does not separately report a count; it does not mean zero.
- Candidate, pending, and discovery-only records are not counted as accepted.

## Country counts

| Country | Accepted official-reference entries | Accepted local artifacts |
|---|---:|---:|
| [Austria](../austria/references/source-acceptance.json) | — | 73 |
| [Belgium](../belgium/references/source-acceptance.json) | 47 | 30 |
| [Bulgaria](../bulgaria/references/source-acceptance.json) | 29 | 16 |
| [Croatia](../croatia/references/source-acceptance.json) | 41 | 43 |
| [Cyprus](../cyprus/references/source-acceptance.json) | 17 | 10 |
| [Czechia](../czechia/references/source-acceptance.json) | 64 | 41 |
| [Denmark](../denmark/references/source-acceptance.json) | 7 | 0 |
| [Estonia](../estonia/references/source-acceptance.json) | 21 | 32 |
| [Finland](../finland/references/source-acceptance.json) | 34 | 2 |
| [France](../france/references/source-acceptance.json) | 27 | 13 |
| [Germany](../germany/references/source-acceptance.json) | 42 | 17 |
| [Greece](../greece/references/source-acceptance.json) | 212 | 4 |
| [Hungary](../hungary/references/source-acceptance.json) | 9 | 0 |
| [Iceland](../iceland/references/source-acceptance.json) | 36 | 0 |
| [Ireland](../ireland/references/source-acceptance.json) | 51 | 11 |
| [Italy](../italy/references/source-acceptance.json) | 35 | 3 |
| [Latvia](../latvia/references/source-acceptance.json) | 41 | 30 |
| [Liechtenstein](../liechtenstein/references/source-acceptance.json) | 18 | 11 |
| [Lithuania](../lithuania/references/source-acceptance.json) | 37 | 13 |
| [Luxembourg](../luxembourg/references/source-acceptance.json) | 44 | 10 |
| [Malta](../malta/references/source-acceptance.json) | 41 | 0 |
| [Netherlands](../netherlands/references/source-acceptance.json) | 60 | 10 |
| [Norway](../norway/references/source-acceptance.json) | 52 | 0 |
| [Poland](../poland/references/source-acceptance.json) | 54 | 26 |
| [Portugal](../portugal/references/source-acceptance.json) | 61 | 0 |
| [Romania](../romania/references/source-acceptance.json) | 15 | 0 |
| [Slovakia](../slovakia/references/source-acceptance.json) | 36 | 0 |
| [Slovenia](../slovenia/references/source-acceptance.json) | 16 | 0 |
| [Spain](../spain/references/source-acceptance.json) | 54 | 22 |
| [Sweden](../sweden/references/source-acceptance.json) | 17 | 0 |
| [Switzerland](../switzerland/references/source-acceptance.json) | 26 | 0 |
| **Reported total** | **1,244 in 30 packs; Austria not separately reported** | **417 across 31 packs** |

## Reconciliation notes

- **Austria:** its register records 73 accepted local artifacts but has no separate official-reference review entries. The report therefore leaves that reference count unreported rather than treating the local-artifact count as a link count.
- **Croatia:** 41 official-reference reviews and 43 accepted local artifacts are distinct sets. Exact source-ID reconciliation finds 20 IDs in both, 21 reference-review IDs without a matching accepted local record, and 23 local-record IDs without a matching reference-review entry. These are register crosswalk results, not claims that local records lack source URLs.
- **France:** 27 of 28 official-reference review entries are usable; one is discovery-only and excluded. The 13 accepted local artifacts comprise 10 source-text snapshots and 3 authored source summaries.
- **Slovenia:** 16 of 17 official-reference review entries are usable; one metadata-only entry is excluded.
- **Historical references:** Denmark's seven accepted entries include three explicitly historical entries; Lithuania's 37 include two accepted historical-scope entries. Their acceptance does not imply current legal status beyond the recorded scope.

The library layout still governs item placement: link-only sources are marked external-only with no local path; accepted local material is stored under `documents/<source-type>/`. Currentness, topic coverage, and country completion remain separate decisions.
