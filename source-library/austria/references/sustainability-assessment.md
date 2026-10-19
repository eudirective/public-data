# Austria source-rule sustainability assessment

Assessment date: 19 October 2026  
Scope: all 37 records in `candidate-manifest.json`.

## Current state

All 37 declared candidates now have official captures: 35 Markdown candidates and two native PDF form candidates. Zero are accepted. The pack has per-record retrieval and conversion rule assignments in `source-rules.json`, and a human workflow in `SKILL.md`. It does not have a scheduled sync job or network updater. This is a complete bounded capture set with documented rules, not a sustainably automated monitor or an exhaustive Austrian source inventory.

N-Lex is recorded as an external discovery surface to RIS and EUR-Lex, not as an official Austrian text publisher. Its Austria entry exposes links for national law, transposition and case-law; its informational panel returned an XML error during this check, so publisher URLs remain authoritative. The official RIS Annex E/F PDFs are captured and held under `candidates/forms/`. They are retained as native AcroForm PDFs because their visual form content is not represented reliably by their short text layer. The ledger stores each PDF's media type, byte count, SHA-256, official link and raw capture path.

## Rule sustainability

| Source class | Rule | Assessment |
|---|---|---|
| RIS consolidated legislation | Stable current-section route using `Gesetzesnummer` plus `Paragraf` or `Anlage`; check current identity, version metadata, date, Dokumentnummer and ELI. Convert `div.contentBlock`, omitting `sr-only`. | Sustainable for this small fixed set using serial page retrieval. The HTML selector is undocumented and can drift. 26 outputs replay under the recorded rule; nine legacy outputs are hash-checked only and need manual extraction review. |
| RIS court decisions | Retrieve the exact record by URL and `Dokumentnummer`; check court, date, case number and ECLI/identity. | Sustainable for maintaining the five exact records. It does not provide broad case-law coverage; RIS collections and publication limits differ by court. |
| BMEIA and oesterreich.gv.at guidance | Retrieve the official page; check heading, page date, main text, forms and outbound authority links. | Sustainable as a monthly human review. Existing body-based conversions are not a validated main-content extractor; navigation and page-shell changes can produce noise. Mission-level instructions remain out of scope. |
| DSB and Volksanwaltschaft oversight pages | Check the official route, jurisdiction wording, linked form and submission channel separately. | Sustainable as a manual link-and-content review. Form and route changes may occur independently; the current inventory does not resolve all holder-specific jurisdiction questions. |
| BMEIA representation directory | Check the as-of date, consular districts, representation status and visa-issuance limits; follow mission links for local instructions. | Suitable as a monthly discovery signal. It is not a substitute for mission-specific requirements. |
| RIS Annex E/F | Re-resolve the PDF from each current RIS landing page; confirm annex label and `Dokumentnummer`, then retain/hash the native PDF. | Sustainable for low-volume manual checks. Native retention avoids a misleading text-only conversion. |
| N-Lex Austria entry | Use as a discovery route to RIS and EUR-Lex publisher records; do not convert or cite it as national law. | The country route is maintained and useful for link repair, but one information panel returned an XML error; portal availability is a discovery-channel dependency. |
| Shared German EU/CJEU material | Austria points to one library-level index by source ID. Official URLs are external-only; local files are not duplicated. | The reference structure is sustainable. The index has 69 IDs, but most German translation availability has not been individually confirmed, and EUR-Lex automated retrieval returned an AWS WAF challenge for the Charter request. No challenge bypass was attempted. |

The converter is offline and cannot discover changes. The rule cadence is manual: legislation and attachments at least quarterly and before reliance; volatile guidance and directories monthly; case-law discovery monthly when that coverage is required. These are instructions, not an active schedule.

RIS's current [OGD FAQ](https://ris.bka.gv.at/RisInfo/OGD-FAQ.pdf) says no special registration is required for public OGD access and documents attribution and constraints for larger API retrieval. Austria does not use that API. The chosen workaround is a small, serial set of ordinary public RIS pages and direct attachment links, with identity checks and review staging. If OGD is introduced later, follow the then-current notice, timing, rate, concurrency and attribution terms before retrieval.

## Open coverage gaps

- Mission-specific Austrian consular instructions, appointments, local checklists, representation and family-member intake routes.
- A bounded, repeatable case-law search and change protocol across BVwG, VwGH and all nine LVwG; the five captured cases are examples only.
- Procedural comparison of NAG §§ 54–55, including the § 54(7) exception, BFA decisions, and case-specific deadlines.
- IFG holder categories, remedy routes and other oversight channels beyond the selected provisions and complaint pages.
- Land-level practice and forms, including Vienna MA 35 and the Tyrol/Vorarlberg ombudsman exceptions.
- Review of the nine legacy page conversions that have no recorded deterministic replay rule.
- Individual confirmation of the German-language availability of the external EU/CJEU entries before a particular representation is used.

No source is accepted. A captured candidate, successful conversion or stable URL does not establish current law, legal equivalence, completeness, or suitability for an individual case.
