---
name: czechia-legal-source-system
description: Maintain the Czech national source candidates for EU free movement, EU-family residence, visa procedure, civil-status evidence and administrative remedies.
metadata:
  version: 0.4.0
  short-description: Czechia legal-source acquisition pack
---

# Czechia legal-source system

Version 0.4.0, updated 2026-10-18. This Czech national pack is separate from the Czech-language EU mirror. Its inventory authority is [references/source-list.md](references/source-list.md); [candidate manifest](references/candidate-manifest.json) records 43 candidates: 10 saved guidance candidates, 3 additional active guidance/index records awaiting retrieval, 17 legal-text targets using the keyless, date-bound e-Sbírka stable-URL PDF route and awaiting successful live retrieval, and 13 monitor-only forms, mission, court, and oversight records. No candidate has been accepted.

## Scope

The pack is limited to Czech national legislation, official Czech guidance, official court and oversight discovery channels, and source evidence that bears on EU free movement, EU citizens and their family members, entry and residence, consular process, family-status evidence, administrative procedure, information access, data protection, and remedies. EU legislation and CJEU materials belong in the EU core and are not duplicated here. General third-country immigration, asylum, and unrelated Czech law are out of scope unless a demonstrated intersection with an EU free-movement issue is recorded.

The source language is Czech (`cs`). Official English guidance is included as a separate official-language representation where available; it does not replace the Czech legal text. The source list is a research inventory, not a finding that all applicable law has been identified.

## Authority and acquisition status

- e-Sbírka is the official electronic Collection of Laws and International Treaties. Its pages identify the displayed consolidated text as an informative text; retain the act's official promulgation and temporal-version metadata and do not treat a web-page hash as proof of a law amendment.
- e-Sbírka documents a REST API that requires an API access key. No key is bundled in this pack. e-Sbírka also says individual acts can be obtained in open data, open text, or generated PDF formats ([official announcement](https://e-sbirka.gov.cz/aktuality/20151)) and documents the date-bound stable download format ([official URL guidance](https://e-sbirka.gov.cz/pristup-pres-stale-url-a-eli)). The pack derives `/sb/{year}/{number}/{yyyy-mm-dd}.pdf` from each stable act record, using the UTC check date, and requires the official PDF media type, PDF signature, substantial extracted text, and expected act citation. This is a keyless public download route, not an API. The live route could not be reached from the current workspace during repair, so these targets remain pending successful retrieval.
- e-Sbírka describes consolidated text as informative. Preserve source bytes, source URL, version/effective-date metadata, and conversion hashes, then review promulgation and temporal-version status before accepting any candidate. A retrieved page hash alone does not prove that the act has or has not changed legally.
- The HTML guidance adapter requires an exact configured official-page H1 after whitespace and typographic quote normalization, checks declared charset consistency and strict decoding, and preserves HTTP(S) links in the candidate. It extracts only the configured main/article region; linked PDF attachments are not retrieved by this adapter. The three added index/category pages have not been retrieved yet.
- Czech Ministry of the Interior guidance lists Iceland, Liechtenstein, Norway, and Swiss citizens as having similar rights for its EU-citizen procedures. Keep Switzerland distinct from EU/EEA EFTA membership and UK Withdrawal Agreement cases distinct from ordinary free movement. The official forms index is the rediscovery route for changing PDF URLs; blank forms remain monitor-only and no completed applications are collected.
- The MFA mission directory is paginated and mission-specific instructions vary. The two captured mission examples are leads only, not a complete or representative feed. No mission-directory crawler is implemented.
- The National Open Data Catalog publishes e-Sbírka datasets, including legal-act versions and related data. The catalog warns that identifiers and data structures may change through 15 January 2027 and recommends production integrations after that date; treat it as a discovery/research route meanwhile, not a stable production dependency.
- The bundled local update monitor advertises a `czechia` pack with `check`, `sync`, `verify`, and `ack` actions. The separate hosted EU Directive Source Library connector does not currently advertise Czechia. `sync-czechia.mjs` retrieves allowlisted guidance pages and date-bound stable-URL PDFs; court/oversight directories remain monitor-only.
- Before promotion, validate the official host, source identity, language, temporal version, any future effective date, and exact text. Keep official legal text, authority guidance, court decisions, and discovery-only repositories in separate source classes.

## Next implementation steps

1. Run `node scripts/sync-czechia.mjs --check` or `--sync` to refresh official guidance candidates; run `--verify` to replay saved conversions; use `--reconvert` only to refresh an unaccepted candidate from verified saved bytes; use `--ack <source-id>` only after candidate review.
2. Run `--check` to inspect the keyless date-bound PDF route. A live retrieval must confirm the response media type, signature, citation, extracted text, and conversion before candidates are treated as ready.
3. For PDFs that pass identity and text-length gates, verify the requested consolidation date and legal version metadata against e-Sbírka before accepting the candidate. Keep any key-based REST adapter optional and environment-only if access later becomes feasible.
4. Review candidate identity, source language, dates, enactment, entry into force, applicability, and future versions before acceptance.

No accepted Czech corpus documents are included in version 0.4.0.
