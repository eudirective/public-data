# Cyprus proposed-route sustainability assessment

Status date: 18 October 2026  
State: discovery-only candidates; zero accepted sources; no Cyprus retrieval or conversion rule implemented.

## Assessment boundary

The source-rule sustainability rubric applies to implemented acquisition rules. Cyprus has none, so this review assigns no rule verdict. It assesses whether the documented publisher routes could support a maintainable rule and what evidence is still required. Candidate records and attractive URLs do not themselves satisfy identity, retrieval, conversion, currentness, or legal-use requirements.

## Official legislation route: Government Printing Office

The Government Printing Office Gazette is the primary national publication route identified. Its English interface says information is available in Greek only. The archive is a legacy dynamic page with query, expand, and paging parameters. This makes hard-coded issue-query URLs brittle, but a sustainable discovery method may be possible if a stable archive/issue route can be resolved and the publisher permits the intended access.

No documented API, feed, or registration requirement was located in the bounded search. Do not assume a web page is an API or infer that automated retrieval is authorized. Before implementing a rule, confirm the canonical archive and issue routes, terms/access limits, pagination behavior, supported file formats, stable identifiers, and whether older issues remain addressable. Capture one issue and annex as official fixtures; validate publication date, issue/annex identity, Greek language, PDF/HTML type, redirects, and hashes.

## English consolidations and version history

The Office of the Law Commissioner provides selected translations and consolidations. The located free-movement consolidation is titled for Laws 2007 to 2023; the Access to Information consolidation covers 2017 to 2018. These are useful navigation and interpretation aids, but have bounded amendment cut-offs and are not authentic legal texts. A monitor must rediscover them from the parent index, read displayed consolidation scope, and cross-check subsequent changes in the Gazette. A source that has not visibly changed may still be stale if a later amendment exists.

The Migration Department's legislation index links to CyLaw consolidations and identifies them as unofficial. Those can assist discovery only. The official Gazette amendment chain remains necessary. The same applies to the CyLaw legal-aid text, whose amendment list includes 2024 acts and 2025 corrections but is not authoritative.

## Migration guidance and forms

Newer gov.cy Migration Department pages organize EU/EEA citizens, MEU1/MEU2/MEU3, extended family (MVIS8), family of Cypriot citizens, and Withdrawal Agreement cases on separate pages. Many forms are DOCX or PDF attachments reached through parent pages. A robust route should rediscover attachments from the official parent page on each refresh, then validate title, form number, language, file signature, revision clues, and final host; record a changed or missing attachment for review rather than silently following an old URL.

The source pages often returned HTTP 403 to this research client while official search results remained visible. That is an access limitation of the review environment, not proof of public inaccessibility. Before implementation, validate the pages and files in an ordinary authorized client and record response status, headers, redirects, and size. If automated access is not consistently available, keep the route manual or discovery-only; do not introduce a proxy or registration workaround.

A sustainable source taxonomy must retain separate legal scope for EU citizens, EEA EFTA nationals, Swiss nationals, non-EU/EEA family members, extended family, Cypriot citizens' family members, and UK Withdrawal Agreement beneficiaries. A generic “EU family” URL is not enough to establish legal coverage. Conflicting MEU1 deadline statements (including the four-month EURES wording) require checking against current law and forms before any rule operationalizes deadlines.

## Visa, Schengen, and mission routes

The MFA central page, visa application form, mission directory, and local mission pages are all changeable. An implementation should rediscover the central links, validate language, title, application form version, and destination mission, and treat external visa-provider links as separate endpoints with their own access/terms. Mission examples from Armenia and Athens demonstrate local variation but do not establish coverage across all posts.

A serious unresolved content conflict exists: the MFA visa hub suggests certain EU-family residence-card holders may travel in Schengen, while a January 2026 Cyprus government PDF says Cyprus-issued residence documents do not yet exempt third-country holders from a Schengen visa. The national visa and Cyprus Schengen-integration status are time-sensitive. Do not create an operative travel or visa rule from either page until the precise card, sponsor, legal basis, and current EU source are reconciled.

## Oversight, remedies, privacy, and courts

The Ombudsman, Information Commissioner, Data Protection Commissioner, Law Office, and separate court bodies publish distinct procedures and decision/search routes. Guidance and forms may change independently from statutes. Keep public blank-form definitions and public procedure only. Never retrieve submitted complaints, identity records, visa applications, or case files.

Court decision surfaces are split between Supreme Court and Supreme Constitutional Court routes and are query-driven. Current search pages do not establish complete coverage, reliable bulk retrieval, or a stable API. Any court monitor must name the court, date window, query, language, and known coverage.

Access-to-information sources offer a plausible parent-index/FAQ route, but the English OLC consolidation ends in 2018 while official Commissioner pages are dynamic. The data-protection English PDF was located through the official commissioner, but amendment status remains unverified. The current Legal Aid Law amendment chain is visible only in a secondary CyLaw lead in this review; current official Gazette texts are still needed.

## Sustainability decision gates before any rule

- Confirm official publisher identity, canonical parent and document URLs, access terms, and any automation restrictions.
- Identify stable source keys and version evidence for Gazette issues, amendments, consolidations, guidance, and forms. Do not treat a recent web-page timestamp as proof that its linked law is current.
- Resolve whether public pages and attachments are retrievable without account/API registration. No API or registration requirement was documented in this bounded search; do not infer that none exists.
- Define allowlisted hosts, redirect rules, status/media-type/size/language checks, attachment identity checks, hashes, and fail-closed behavior. A 403, login, CAPTCHA, or changed page shape should create a review item.
- Preserve Greek source bytes and declare the conversion method. PDF text extraction may lose layout, tables, Greek diacritics, scanned pages, or annex structure; validate against page images and keep a human review step. DOCX conversion must preserve fields, tables, and bilingual labels.
- Treat translated consolidations as dated convenience copies and reconstruct currentness through official Gazette amendments. Keep the Greek authoritative text and English translation linked but separate.
- Build captured positive/negative fixtures and deterministic offline replay before acceptance; separately run a read-only live smoke check. Do not promote candidates during validation.
- Resolve the Schengen/residence-card inconsistency and MEU1 deadline discrepancy before supporting operational answers.
- Define strict exclusion of completed visa forms, complaints, identity documents, case files, and other personal submissions.

Until these checks are completed, Cyprus remains discovery-only. No retrieval/conversion rule verdict is assigned.
