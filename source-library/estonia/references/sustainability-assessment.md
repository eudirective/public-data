Skill: assess-source-rule-sustainability v0.2.0

# Estonia source-route sustainability assessment

Status date: 18 October 2026  
State: discovery-only candidates; 40 candidate records, zero accepted sources, and no Estonia retrieval or conversion rule implemented.

## Assessment boundary

The current source-pack inventory has no Estonia pack. The 40 records in [candidate-manifest.json](candidate-manifest.json) cover official legislation and discovery portals, EU/EEA/Swiss residence, forms, visa and mission routes, general procedure, remedies, privacy, oversight, access to information, legal aid, and courts. Search outcomes and version doubts are recorded independently of source relationships and retrieval status. The count is a bounded research register, not a claim that Estonia's source universe is complete.

There is no implemented Estonia rule to rate. This review assigns **no sustainability verdict**. The notes below assess proposed routes and identify evidence required before adapter work.

## Strongest proposed route: Riigi Teataja

Riigi Teataja's official FAQ says published acts are available as XML, individually and in bulk. It documents a date-bound act search and recommends consolidated wording as the default. The FAQ records that on 1 June 2026 the act XML route changed to `https://www.riigiteataja.ee/public-api/api/v1/akt/{ID}/xml`; the old `/akt/{ID}.xml` route was discontinued. The search endpoint supports pagination, with a maximum page size of 500. The FAQ does not state an API-registration requirement.

This is promising design evidence for a national-law rule: query the official publisher for acts in force on the requested date, retain stable act/version identifiers, then retrieve the exact official XML and validate the date, title, issuer, language, and document identity before conversion. However, the API endpoint and query response were not successfully smoke-tested in this review. Current API terms, response schema, rate limits, complete pagination, HTTP behavior, XML charset and body structure, and the conversion output remain unverified. The JavaScript-only pages also make ordinary page scraping a poor fallback unless a documented HTML or bulk-download route is validated.

**Proposed-route assessment:** plausible with significant versioning and live-validation gaps; not an implemented rule and not rated.

## Version selection is a critical dependency

The Citizen of the European Union Act illustrates why “latest published” cannot be used as “current”:

- The official Estonian consolidated wording published on 3 June 2026 is marked not yet in force until 31 October 2029.
- The newest English translation located reflects wording effective from 1 September 2025; a different English page is expressly marked in force only through 26 April 2025.
- An implementing regulation is shown in force from 1 January 2026, but that does not resolve the Act's own current Estonian wording.
- Other current-looking English links also surfaced with ended validity periods: the September 2026 Aliens Act wording ended on 30 September, the cited May 2026 administrative-court-code wording ended on 11 June, and the Public Information Act English result displayed wording ending 31 August 2025.
- The located State-funded Legal Aid Act wording ended on 5 July 2025, and the current replacement was not identified in this bounded search.

A future rule must query the publisher for the exact assessment date and preserve both currently operative and future-effective versions as distinct records. It must not infer currentness from a high publication date, a `consolide/current` path, or the latest search-engine result. English translations should be treated as language mirrors with their own publication and validity evidence; Estonian is the controlling text.

## Proposed route findings

| Source group | Maturity | Proposed route and evidence | Main unresolved sustainability issue |
|---|---|---|---|
| Riigi Teataja acts and implementing regulations | Discovery-only | Date-bound official act search followed by the documented XML endpoint; 2026 migration and public XML availability are documented in the official FAQ | No live smoke, response-schema validation, rate/terms check, pagination proof, converter, or offline replay |
| Ministry residence guidance and linked forms | Discovery-only | Re-fetch official parent pages and resolve links for notices, forms, and EU-residence instructions | Ministry terminology conflicts with the statutory “right of residence”; page/form dates and local-government differences need reconciliation |
| MFA visa and mission practice | Discovery-only | Re-discover visa instructions, representation lists, mission pages, appeal information, and linked forms from official MFA indexes | Dynamic mission/provider links and fees can change; no link-change detector or supported form extraction exists |
| Procedure, remedies, oversight, privacy, and access to information | Discovery-only | Date-resolve statutes and revisit official Ministry, Chancellor, and Data Protection Inspectorate guidance separately | Several English legal editions are stale or ambiguous; procedural deadlines and filing-language constraints need current first-party cross-checks |
| Administrative courts and decisions | Discovery-only | Use the current Code, administrative-court information pages, and official judgment portals as separate sources | Decision publication may be redacted or restricted; English summaries are selective; no complete corpus or bulk route was established |
| Online application services | Monitor-only candidate | Keep the MFA application portal as a route reference only | It accepts personal data and is not suitable for automated submission or case-data collection |

## Material guidance conflict

The Ministry of the Interior's population-register page correctly explains that EU citizens submit a residence notice to the relevant city or rural municipality and links to the Citizen of the European Union Act. It also describes temporary and permanent EU residence rights as “residence permits,” while the Act and implementing regulation use “right of residence.” This is a material terminology and accuracy conflict. The ministry page should remain a review lead until its wording is reconciled; do not convert its wording into an operative rule.

## Repair priorities before rule acceptance

1. Run the official date-bound API query for 18 October 2026, follow every result page, and independently identify the current wording for the EU Citizen Act and related laws. Record future-effective editions separately.
2. Smoke-test the documented XML endpoint against multiple record types, including a consolidated act and an implementing regulation. Capture status, content type, response size, charset, identity fields, ELI/publisher identifier, validity dates, and redirects.
3. Confirm API access terms, reuse basis, request limits, maximum response sizes, and whether registration or special headers are required. Do not assume these from an ordinary browser URL.
4. Build a constrained converter against saved official XML fixtures. Preserve section structure and legal version metadata; fail closed on unknown XML shapes or contradictions between the requested date and the returned wording. Verify deterministic replay and content hashes.
5. Resolve the current native-language texts and amendment chains for the EU Citizen Act, Aliens Act, administrative-procedure, administrative-court, fees, public-information, data-protection, and legal-aid laws. Keep English translation dates separate.
6. Verify the residence-guidance conflict with the Ministry and re-discover application forms from official parent indexes. Add a link/date change check for MFA mission and provider routes.
7. Add only public source pages and form definitions. Never automate submissions to the e-visa portal or ingest applicants' personal data.
8. Add positive, negative, and historical-version fixtures, then run offline conversion replay and a read-only live smoke check before accepting candidates into an active pack.

## Coverage limits

The register found official leads across all requested source classes, but PBGB residence guidance, a current English legal-aid text, a verified current native-language EU Citizen Act consolidation, a complete form catalogue, and a complete court-decision corpus remain unresolved. No bounded-search gap is proof that no source exists. No Estonia source is accepted, no retrieval or conversion is implemented, and no current-law or completeness claim is made.

