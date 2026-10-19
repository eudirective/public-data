# Source-library folder audit

Audit date: 19 October 2026

Branch reviewed: `codex/eea-national-source-library-expansion-20261019`
Scope: every directory in the complete `source-library/` tree, including the 31 EU/EEA/Swiss jurisdiction folders, their nested folders, shared EU core, existing national packs, helper material, and new candidate inventories. This is a structural audit; source acceptance and legal-currentness review are recorded separately.

The reusable pack layout is specified in [`templates/country-pack/LAYOUT.md`](../templates/country-pack/LAYOUT.md).

## Findings

1. **Only four of the 31 jurisdiction folders have a country-level `core/`: Denmark, Hungary, Romania, and Sweden.** All 27 new candidate inventories lack one. The root `source-library/core/` is the canonical English EU corpus; it does not provide a country-level official-language mirror. This leaves the new member-state packs without the core language lane used by the established packs. Icelandic and Norwegian EU-core translations must not be invented; each non-EU language needs an explicit coverage status.
2. **The four established national packs do not use one consistent boundary.** Denmark, Hungary, and Sweden keep national documents under `documents/` and EU-language material under `core/`. Romania places national legislation, national court decisions, and Romanian authority guidance under `core/`, alongside Romanian EU-language sources. Romania also has no `documents/` directory or top-level README.
3. **The new inventories are candidate registers, not complete runnable national packs.** All 27 have a `README.md`, `references/`, and a machine-readable inventory, but none has `core/` or `documents/`. Their national text captures remain candidates. Only Czechia has an operational country skill among these 27; the other folders are inventory/research packs.
4. **Candidate organization varies.** Candidate files are generally flat within `candidates/`. Belgium, Estonia, Finland, Italy, the Netherlands, Portugal, and Spain also use a separate `monitor-candidates/` tree. This splits materials by the pass that found them rather than by source class. The target template puts all unaccepted materials in `candidates/<source-class>/`, with discovery-only surfaces in `candidates/discovery/`.
5. **Pack metadata has gaps.** Portugal and Spain lack a file named `sustainability-assessment.md`; Romania and Sweden also lack one. Denmark and Romania lack a top-level `README.md`. Finland and Estonia use `source-catalog.json` as an inventory artifact rather than a file named `source-list.md`; the target template standardizes the machine-readable manifest and its human-readable view.
6. **Scripts and work files are inconsistently placed.** Pack-specific scripts are at the country root in Austria, Czechia, Estonia, Finland, Germany, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, the Netherlands, Norway, Poland, Slovakia, Spain, Sweden, and Switzerland; only Czechia, Denmark, Hungary, and Romania have a `scripts/` directory. `czechia/work/` contains 94 files (about 33 MB), including raw publisher responses, generated candidates, and run state. The library overview says raw snapshots and pending work belong in the configured project `temp/` tree, while the Czechia README documents `work/` as its capture location. These rules conflict.
7. **Romania's source taxonomy also needs reconciliation.** Its national legal, court, and authority materials should be moved out of `core/` into source-class folders under `documents/`; only shared EU-language content should remain in `core/`. The Romanian README, manifest paths, scripts, indexes, and run instructions need to agree after migration.

## Nested folder review

- **Shared `core/`:** `case_law/{full_text,notes}`, `eu/`, and `guidance/{handbooks,notes,official}`. The `guidance/official/` branch is an existing extra category that the country-pack template does not currently define; decide whether it is a shared-core-only category or should be reconciled with `guidance/handbooks/` before copying the layout there.
- **Candidate inventories:** the 27 new packs have flat `candidates/` and `references/` directories. Seven split off `monitor-candidates/`; none currently has the typed child folders in the template. Normalize candidate files by source type when restructuring, while preserving manifest paths and provenance.
- **Denmark:** `core/` follows the shared EU-language split. `documents/{guidance,national}/` is too broad and `national/` does not distinguish source types. `evaluations/fixtures/` is a pack-specific test/evaluation area outside the reusable source layout; keep it only with a documented purpose.
- **Hungary:** `core/` follows the shared EU-language split. `documents/laws/` is divided by legal topic, while `documents/oif/` is divided by authority function; this is useful detail but mixes subject and source-type taxonomies. Map each subfolder to a source class before any cleanup, preserving the Hungarian pack's fine-grained organization where useful.
- **Romania:** `core/` contains `eu/`, shared-core material, and national material in `national_legislation/`, `court_decision/`, `official_guidance/`, and part of `guidance/`. This is the clearest boundary violation. `references/` and `scripts/` exist, but `documents/` does not.
- **Sweden:** `documents/{amendments,case-law,guidance,migrfs,statutes}/` mixes document form, source type, and publisher-specific naming. `module-notes/source-notes/` is a separate module-support branch, and `references/certs/` holds auxiliary validation material. Preserve those purposes but document them; normalize only the national source folders against the shared type taxonomy.
- **Czechia:** `scripts/` is correctly separated, but `work/{candidates,raw/}` stores generated and raw material in the pack. The raw tree is further grouped by source and, for legal texts, by edition date. If moved to the configured temporary workspace, retain stable source IDs and a reproducible capture ledger so the audit trail survives.
- **Support and historical material:** `eudirective-core-work/eudirective-core/scripts/` is shared maintenance code; `turkiye/module-notes/source-notes/` is applicant-country module support; `visa-code-handbook-i-2020/accepted/` is a historical edition archive; `references/` at the library root holds cross-country reports; `templates/` now holds the reusable pack layout. `__pycache__/` is generated cache and is ignored by Git.

## Jurisdiction inventory

| Jurisdiction | Current folders | Template status |
|---|---|---|
| Austria | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Belgium | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane |
| Bulgaria | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Croatia | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Cyprus | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Czechia | `candidates/`, `references/`, `scripts/`, `work/` | Candidate-only; work tree and root scripts break the target layout |
| Denmark | `core/`, `documents/`, `references/`, `scripts/`, `evaluations/` | Established pack; missing top-level README |
| Estonia | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; root scripts |
| Finland | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; root scripts |
| France | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Germany | `candidates/`, `references/` | Candidate-only; root sync script |
| Greece | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Hungary | `core/`, `documents/`, `references/`, `scripts/` | Established pack; closest match to the target boundary |
| Iceland | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Ireland | `candidates/`, `references/` | Candidate-only; root sync script |
| Italy | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; root sync script |
| Latvia | `candidates/`, `references/` | Candidate-only; root sync script |
| Liechtenstein | `candidates/`, `references/` | Candidate-only; root sync script |
| Lithuania | `candidates/`, `references/` | Candidate-only; root sync script |
| Luxembourg | `candidates/`, `references/` | Candidate-only; root sync script |
| Malta | `candidates/`, `references/` | Candidate-only; root sync script |
| Netherlands | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; root sync script |
| Norway | `candidates/`, `references/` | Candidate-only; root sync script |
| Poland | `candidates/`, `references/` | Candidate-only; root sync script |
| Portugal | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; no sustainability assessment; root scripts absent |
| Romania | `core/`, `references/`, `scripts/` | National materials mixed into core; no `documents/`, README, or sustainability assessment |
| Slovakia | `candidates/`, `references/` | Candidate-only; root sync script |
| Slovenia | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents |
| Spain | `candidates/`, `monitor-candidates/`, `references/` | Candidate-only; duplicate candidate lane; no sustainability assessment; root sync script |
| Sweden | `core/`, `documents/`, `references/` | Established pack; missing sustainability assessment; maintenance scripts at pack root |
| Switzerland | `candidates/`, `references/` | Candidate-only; no country core or reviewed documents; root sync script |

## Other library-level folders

- `core/` is the shared EU English corpus and its source-type directories.
- `references/` holds library-wide expansion, comparison, and inventory reports.
- `eudirective-core-work/` holds the shared maintenance helper referenced by the core-language workflows; it is support code rather than source content.
- `visa-code-handbook-i-2020/` is a separately labeled historical handbook set, not a current country pack.
- `turkiye/` contains applicant-country module notes, not an EU/EEA member-state source pack.
- `__pycache__/` is generated Python cache and is ignored by Git.

## Recommended remediation order

1. Keep this template as the source-pack layout authority.
2. Move Romania's national materials to `documents/` and reconcile all stored paths, manifests, scripts, indexes, and run instructions; preserve EU-language sources in `core/`.
3. Add country-level `core/README.md` coverage records to the 27 candidate inventories, then populate official language mirrors only where official versions can be retrieved and verified.
4. Create `documents/` only as national records pass review; keep current records under categorized `candidates/` until then.
5. Normalize the seven `monitor-candidates/` trees into typed candidate folders, move pack scripts into `scripts/`, and resolve Czechia's `work/` storage exception.
6. Add missing pack READMEs and sustainability assessments, then reconcile source-list naming and manifest schema.
