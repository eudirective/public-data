Skill: assess-source-rule-sustainability v0.2.0

# Finland source-route sustainability assessment

Status date: 18 October 2026  
State: discovery-only candidates; 36 candidate records, zero accepted sources, and no Finland retrieval or conversion rule implemented.

## Assessment boundary

The current source-pack inventory has no Finland pack. The register at [source-catalog.json](source-catalog.json) identifies official leads for national law and legal discovery; free-movement and family guidance; population registration; visas and consular routes; procedure, language and file access; appeals, courts and case law; privacy, oversight and legal aid. The register is a bounded search record, not a claim that Finland's source universe is complete.

There is no implemented Finland rule to rate. This assessment assigns **no sustainability verdict**. It reviews the evidence for proposed routes and names the checks needed before implementation.

## Strongest proposed route: Finlex open data

Finlex publishes official documentation for a REST API and downloadable data packages. The API returns Akoma Ntoso XML and, for some datasets, JSON listings. The official quick guide says API access does not require identification or registration; TLS 1.2 or later and a `User-Agent` header are required. Listing endpoints use `page` and `limit` pagination, and the service can return HTTP 429 when request volume is restricted. Documents can refer by relative HATEOAS links to attachments, images, or PDFs that contain the body text. API data is updated with a small delay after publication, while downloadable packages are updated daily. The guide gives an example of a consolidated current statute and links to the OpenAPI description.

This is strong design evidence for a possible national-law acquisition route. It supports a constrained design that begins with a date-specific official law record, retrieves its exact Akoma Ntoso representation, validates jurisdiction, instrument type, number, language, and validity metadata, and follows only publisher-relative attachment links required to obtain the body. A bounded page loop and deliberate handling of 429 responses would be required. The API and the daily package route have different update timing and should not be blended without recording which is authoritative for a given check.

The local live check did not reach the API: workspace DNS resolution for `opendata.finlex.fi` failed. This is an environment limitation, not evidence of publisher failure. The quick guide and OpenAPI description were inspected, but there is no captured API response, fixture, conversion, deterministic replay, or verified output. The available documentation does not settle every operational question about terms, practical rate limits, maximum response sizes, charset behavior, error payloads, or how all current consolidated versions expose commencement and end-of-validity metadata.

**Proposed-route assessment:** technically promising and documented, but untested. It is not an implemented rule and is not rated.

## Version selection and language are critical dependencies

The Aliens Act shows why a translation's presence cannot stand in for current legal text:

- Finlex's official current Finnish Aliens Act record exposed an ELI consolidation date of 26 June 2026, but opening the page exceeded the research client's 4 MiB response limit. The title and current-law record were identified, but exact current provision content was not independently inspected in this run.
- Finlex's official English translation page states that the translation was completed on 20 December 2023 and tracks amendments only through 389/2023. It is not a current English rendering of later changes.
- The English Administrative Procedure Act page states a completion date of 7 January 2019 and an amendment cutoff of 893/2015.
- The English Act on Judicial Procedure in Administrative Matters translation was completed on 19 January 2024 and tracks amendments through 639/2021.
- Finnish and Swedish consolidated texts, unofficial translations, original enactments, and amendment instruments must remain distinct records. A high version date or an `updated` URL alone does not establish which wording was in force on a requested date.

Before any rule can accept an act, the date-bound API response must be checked against the official Finlex page or another authoritative publication record. Preserve both the consolidation/validity dates and language edition metadata. Use Finnish as the native reference text where translation currency is uncertain.

## Proposed route findings

| Source group | Maturity | Proposed route and evidence | Main unresolved sustainability issue |
|---|---|---|---|
| Finlex national statutes | Discovery-only | Official OpenAPI-described route; Akoma Ntoso XML; documented consolidated-act example; no registration | No live retrieval, exact-response validation, amendment/date query proof, schema fixture, converter, or offline replay |
| Finlex downloadable packages | Discovery-only alternative | Official UI package route, updated daily and organized around Akoma Ntoso | Package completeness, version semantics, repeatable selection, file sizes, and update detection were not checked |
| Migri residence and family guidance | Discovery-only | Official residence-registration, EU/family, fees and processing-time pages | Direct inspection of the key registration page returned 403 from the research client; guidance freshness and dynamic links need a supported live check. This does not establish a Migri outage |
| DVV registration and forms | Discovery-only / monitor-only | Official population-register guidance and municipality-of-residence form | These procedures are distinct from Migri residence-right decisions; online forms contain personal data and must not be automated or retained |
| MFA visa and mission routes | Discovery-only | Official MFA visa page and FAQ link onward to missions and the Finland Visa service | Mission representation, local providers, fees, appointments and country instructions are dynamic; page-link rediscovery is required |
| Procedure, remedies and public access | Discovery-only | Finlex statutes plus Oikeus.fi and official court guidance | Older English translations, decision-specific filing instructions, exceptions, and date-specific legal text need provision-level review |
| Administrative courts and KHO case law | Discovery-only | Official court administration and Supreme Administrative Court pages | Court venue depends on the matter; precedent publication is selective and English summaries are not comprehensive |
| Privacy, oversight and legal aid | Discovery-only | Data Protection Ombudsman, Parliamentary Ombudsman, Chancellor of Justice, and National Legal Services Authority | Complaint competences differ; some routes and language access are unverified; legal-aid e-services are described as Finnish/Swedish-only |

## Publisher and route distinctions

Finlex is a free legal-information database maintained by the Legal Register Centre, but its own portal says its materials come from multiple authorities and courts and that the Ministry of Justice and Legal Register Centre are not responsible for content other than their own. A future rule must identify the issuing authority and document, not treat the portal brand as sufficient proof of the source's legal authority.

N-Lex is useful for finding Finland's national legal database profile. It does not cover every source class and is not a substitute for Migri, MFA, courts, DVV, or oversight bodies. EU-law database discovery also does not by itself establish the applicable EEA or Swiss legal route.

Migri's right-of-residence registration, DVV's population-register/municipality process, and the MFA's Schengen visa process are separate routes. They should remain separate records and checks. Application and registration services may collect sensitive personal information; only public guidance and public form definitions belong in automated monitoring.

## Repair priorities before rule acceptance

1. From a network-enabled environment, perform a read-only live smoke against the Finlex OpenAPI-described endpoint. Capture HTTP status, content type, response size, headers, redirects, charset, and the returned document identity. Do not interpret the workspace DNS failure as a publisher failure.
2. Query a native Finnish current statute and its date-bound consolidated record, then compare the XML metadata, title, source number, ELI, expression language, validity dates, and body against the official Finlex record. Verify the Aliens Act and one procedure statute separately.
3. Exercise pagination to its documented end condition and confirm 429 behavior with conservative request volume. Set an explicit `User-Agent`, TLS 1.2+, response and timeout bounds, and allow only documented Finlex hosts and relative attachment paths.
4. Save fixtures for XML-only laws, XML with attachments, and a source whose body is in PDF. Build deterministic conversion that preserves legal structure, metadata and meaningful headings, and fails closed on unknown Akoma Ntoso shapes, missing body text, or contradictory version dates.
5. Compare API freshness with a daily downloadable package only if the rule needs package retrieval; record which route and update timing was used. Confirm terms and retention requirements before storing official payloads.
6. Revisit English translation cutoffs and the current native texts for the Aliens Act, Administrative Procedure Act, administrative-court procedure, access to information, data protection, language rights and legal aid. Keep later amendment instruments and future-effective wording distinct.
7. Verify Migri and MFA page links from their official parent indexes when direct access is available. Track destination changes and dates; do not hard-code per-mission appointment/provider links as stable national sources.
8. Confirm court and oversight route scope, language, publication coverage and filing limits from first-party pages. Treat court decisions as selective unless an authoritative complete corpus and retrieval route are established.

## Coverage limits

This register found candidates across the requested source classes. The current native Aliens Act text could not be inspected in full because of the research client's response-size cap; Migri registration page inspection was blocked by the research client; the Finlex endpoint could not be reached from the workspace because DNS resolution failed; Chancellor of Justice and Data Protection Ombudsman complaint pages need direct inspection; and a complete court-decision corpus was not established. These are named search limits, not evidence that the publishers or sources are unavailable. No candidate is accepted, no retrieval or conversion rule is implemented, and no rule-sustainability verdict is assigned.
