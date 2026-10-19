# Source-library folder audit

Audit date: 19 October 2026

Branch reviewed: `codex/repair-source-library-folders-20261019`
Scope: every directory in the complete `source-library/` tree, including the 31 EU/EEA/Swiss jurisdiction folders, their nested folders, shared EU core, existing national packs, helper material, and new candidate inventories. This is a structural audit; source acceptance and legal-currentness review are recorded separately.

The reusable pack layout is specified in [`templates/country-pack/LAYOUT.md`](../templates/country-pack/LAYOUT.md).

## Findings

1. **The 27 newer candidate inventories now have country-level `core/README.md` coverage notices, but no local EU-language representations.** The canonical English EU corpus remains `source-library/core/`; the notices make clear that language coverage is unassessed and do not claim translations. Only Denmark, Hungary, Romania, and Sweden currently contain country-level EU-language mirror files. Icelandic and Norwegian translations must not be invented; their language coverage needs an explicit publisher-based assessment.
2. **Romania's core/documents boundary is now corrected.** Its national legislation, court decisions, and authority material have moved to class-specific `documents/` folders; only Romanian EU-language representations remain in `core/`. The pack now has top-level and subfolder READMEs, and its manifests and retrieval scripts record and use the new document paths. Denmark, Hungary, and Sweden still use distinct national-document taxonomies.
3. **The 27 newer inventories remain candidate registers, not complete runnable national packs.** All have a `README.md`, `references/`, a machine-readable inventory, and now a core coverage notice, but none has reviewed national `documents/`. Their national text captures remain candidates. Only Czechia has an operational country skill among these 27; the other folders are inventory/research packs.
4. **Candidate organization varies.** Candidate files are generally flat within `candidates/`. Czechia now uses typed folders and has merged its discovery captures into that tree. Belgium, Estonia, Finland, Italy, the Netherlands, Portugal, and Spain still use a separate `monitor-candidates/` tree. This splits materials by the pass that found them rather than by source class. The target template puts all unaccepted materials in `candidates/<source-class>/`, with discovery-only surfaces in `candidates/discovery/`.
5. **Pack metadata has gaps.** Portugal, Romania, Spain, and Sweden lack a file named `sustainability-assessment.md`. Denmark still lacks a top-level `README.md`. Finland and Estonia use `source-catalog.json` as an inventory artifact rather than a file named `source-list.md`; the target template standardizes the machine-readable manifest and its human-readable view.
6. **Scripts and work files are inconsistently placed.** Pack-specific scripts remain at the country root in Austria, Estonia, Finland, Germany, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, the Netherlands, Norway, Poland, Slovakia, Spain, Sweden, and Switzerland; Denmark, Hungary, Romania, and Czechia now have `scripts/` directories. Czechia's 94 committed `work/` files have been moved: 43 review conversions now live in typed `candidates/` folders, and raw publisher responses plus run state live under project `temp/`. Other packs still need a pass to distinguish reusable reference artifacts from operational captures.
7. **Romania's source taxonomy has been reconciled.** National legislation, court decisions, and guidance/forms/procedure are separated under `documents/`; the country manifest records `document_class` and `document_path`, and the retrieval/acknowledgement workflows use those fields. The root EU-language indexes still point to Romanian EU representations under `core/` and did not need path changes.
8. **Library-root JSON paths were reviewed.** All 10 root JSON files parse, and their static library/country paths resolve. The Romanian language indexes still target Romanian EU representations in `core/`; no root-index edits were needed. Raw-response paths are intentionally project-temp references, and package-only paths in the core-source-pack manifest are not country-library paths.

## Nested folder review

- **Shared `core/`:** `case_law/{full_text,notes}`, `eu/`, and `guidance/{handbooks,notes,official}`. The `guidance/official/` branch is an existing extra category that the country-pack template does not currently define; decide whether it is a shared-core-only category or should be reconciled with `guidance/handbooks/` before copying the layout there.
- **Candidate inventories:** the 27 new packs have flat `candidates/` and `references/` directories. Seven split off `monitor-candidates/`; none currently has the typed child folders in the template. Normalize candidate files by source type when restructuring, while preserving manifest paths and provenance.
- **Denmark:** `core/` follows the shared EU-language split. `documents/{guidance,national}/` is too broad and `national/` does not distinguish source types. `evaluations/fixtures/` is a pack-specific test/evaluation area outside the reusable source layout; keep it only with a documented purpose.
- **Hungary:** `core/` follows the shared EU-language split. `documents/laws/` is divided by legal topic, while `documents/oif/` is divided by authority function; this is useful detail but mixes subject and source-type taxonomies. Map each subfolder to a source class before any cleanup, preserving the Hungarian pack's fine-grained organization where useful.
- **Romania:** the former `core/national_legislation/`, `core/court_decision/`, `core/official_guidance/`, and Romanian files in `core/guidance/` have been moved to `documents/{legislation,case_law,guidance,forms,procedure}/`. The two EU complaint notes remain under `core/guidance/notes/`; the Romanian EU files remain in `core/eu/` and `core/case_law/`. `core/README.md`, `documents/README.md`, and the pack README now document the boundary.
- **Sweden:** `documents/{amendments,case-law,guidance,migrfs,statutes}/` mixes document form, source type, and publisher-specific naming. `module-notes/source-notes/` is a separate module-support branch, and `references/certs/` holds auxiliary validation material. Preserve those purposes but document them; normalize only the national source folders against the shared type taxonomy.
- **Czechia:** `scripts/` now holds both source-specific updaters. All 43 candidate conversions are filed under `candidates/{legislation,guidance,forms,discovery}/`; 62 committed raw responses and the guidance state/report have moved to project temp. The JSON manifests retain stable IDs and pack-relative `work/raw/` references, resolved by the updater into temp storage.
- **Support and historical material:** `eudirective-core-work/eudirective-core/scripts/` is shared maintenance code; `turkiye/module-notes/source-notes/` is applicant-country module support; `visa-code-handbook-i-2020/accepted/` is a historical edition archive; `references/` at the library root holds cross-country reports; `templates/` now holds the reusable pack layout. `__pycache__/` is generated cache and is ignored by Git.

## Jurisdiction inventory

| Jurisdiction | Current folders | Template status |
|---|---|---|
| Austria | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Belgium | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice; duplicate candidate lane |
| Bulgaria | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Croatia | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Cyprus | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Czechia | `core/`, `candidates/`, `references/`, `scripts/` | Candidate-only; language notice; typed candidate folders; raw captures in project temp |
| Denmark | `core/`, `documents/`, `references/`, `scripts/`, `evaluations/` | Established pack; missing top-level README |
| Estonia | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; root scripts |
| Finland | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; root scripts |
| France | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Germany | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Greece | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Hungary | `core/`, `documents/`, `references/`, `scripts/` | Established pack; closest match to the target boundary |
| Iceland | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Ireland | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Italy | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; root sync script |
| Latvia | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Liechtenstein | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Lithuania | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Luxembourg | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Malta | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Netherlands | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; root sync script |
| Norway | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Poland | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Portugal | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; missing sustainability assessment; no root scripts |
| Romania | `core/`, `documents/`, `references/`, `scripts/` | Boundary corrected; national files in documents; missing sustainability assessment |
| Slovakia | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |
| Slovenia | `core/`, `candidates/`, `references/` | Candidate-only; language coverage notice, mirror pending |
| Spain | `core/`, `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; language notice, duplicate lane; missing sustainability assessment; root sync script |
| Sweden | `core/`, `documents/`, `references/` | Established pack; missing sustainability assessment; maintenance scripts at pack root |
| Switzerland | `core/`, `candidates/`, `references/` | Candidate-only; language notice; root sync script |

## Other library-level folders

- `core/` is the shared EU English corpus and its source-type directories.
- `references/` holds library-wide expansion, comparison, and inventory reports.
- `eudirective-core-work/` holds the shared maintenance helper referenced by the core-language workflows; it is support code rather than source content.
- `visa-code-handbook-i-2020/` is a separately labeled historical handbook set, not a current country pack.
- `turkiye/` contains applicant-country module notes, not an EU/EEA member-state source pack.
- `__pycache__/` is generated Python cache and is ignored by Git.

## Recommended remediation order

1. Keep this template as the source-pack layout authority.
2. Populate the 27 core coverage notices with verified language-by-language findings, then add official language mirrors only where official versions can be retrieved and verified.
3. Create `documents/` only as national records pass review; keep current records under categorized `candidates/` until then.
4. Normalize the seven remaining `monitor-candidates/` trees into typed candidate folders and move remaining pack-root scripts into `scripts/`; Czechia's work-tree exception has been resolved.
5. Add missing pack READMEs and sustainability assessments, then reconcile source-list naming and manifest schema.
