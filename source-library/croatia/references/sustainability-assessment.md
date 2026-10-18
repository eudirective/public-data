# Croatia source-route sustainability assessment

Status date: 18 October 2026  
State: discovery-only candidates; zero accepted sources; no Croatian retrieval/conversion rule implemented.

## Assessment boundary

The source-rule sustainability rubric applies to implemented acquisition rules. Croatia currently has no such rules, so this report assigns no rule verdict. The findings below assess proposed publisher routes and identify evidence still needed before implementation.

## Strongest proposed route: Narodne novine

The official publisher documents anonymous, free access to published documents and unique URLs present for more than 15 years. Most legal documents are available as HTML; official and international sections from 2023 are available as HTML and PDF. Its site-wide discovery route is a cascading XML sitemap, including standard and ELI URLs. Act records expose RDFa, and the publisher documents JSON-LD/RDF/XML metadata through its API.

The API is explicitly metadata-only, works for published editions with ELI metadata, excludes public-advertisement editions, and documents a maximum of three requests per second. No registration requirement is stated. Full text should be retrieved from the ELI HTML/PDF representations, not assumed to come from this API. The site’s terms state that published content is copyright-protected and may be used only under applicable law. Before any mirroring, storage, conversion, or republication, obtain a documented legal basis and define retention/access limits.

**Current route status:** discovery and metadata sustainability look promising; full-text retrieval, licensing basis, response validation, deterministic conversion, replay fixtures, and a runtime smoke check remain unimplemented. No rule verdict.

## Croatian free-movement legislation

The Ministry of the Interior’s current legislation index shows the EEA-citizen Act as NN 66/19, 53/20, 144/20, and 114/22, and the implementing regulation as NN 107/20, 148/20, 86/21, and 155/22. Every Gazette record has a stable publisher identifier/ELI form. No consolidated current text was established in this review. A sustainable rule should retrieve the base instrument and each amendment from official ELI records, preserve the source versions and their hashes, and apply amendments only through a deterministic, reviewable process. MUP’s current index should be retained as a cross-check, not substituted for the Gazette.

The Act’s Swiss extension and its specific treatment of EEA-national family members of Croatian citizens are scope fields that must survive any normalization.

## Guidance and forms

MUP’s EEA guidance states an update date of 9 October 2025 and links directly to four official forms. All four PDFs opened, but their static paths sit in a 2021 directory and the visible evidence does not establish a current form revision date. The rule should rediscover forms from the current guidance page on each refresh, validate title/form number/language, and flag silent changes. The national-local service route is through police administrations/stations; a national page does not capture all local practice.

## Visa and mission routes

MVEP maintains a visa regulations page, central online application instructions, a current Schengen overview, family-member navigation, and a missions directory. Mission routing, external visa application centres, fees, forms, and appointments can change. Resolve them from the current central or mission page rather than pinning external provider URLs.

A legacy MVEP FAQ was inspected and still states that Croatia is not a Schengen Member State, contradicting the current MVEP visa overview. This demonstrates why source discovery needs a freshness/contradiction check and why a successful fetch is not proof of currency. Exclude this page from operative retrieval until the ministry replaces or corrects it.

## Procedure, remedies, privacy, and courts

Narodne novine records provide the same stable route for general administrative procedure and judicial review laws, but their amendment chains still need a currentness pass. MUP’s special free-movement statute and general Foreigners Act have different scopes and review routes; do not infer appeal rules from general pages alone.

The Ombudsman, Information Commissioner, AZOP, and judiciary each own distinct workflows. AZOP forms and complaint channels may contain sensitive identity and case data. A source monitor may retain public form definitions and public guidance only; it must not collect submissions or personal case documents. The official court decision search and e-Predmet are different services: the latter checks case status and is not a court-decision corpus. Published decision search coverage and anonymization are not proven complete.

## Required before any rule is accepted

- Document the legal basis for storing or transforming Gazette content under its copyright terms.
- Retrieve official ELI representations and amendment records; validate content identity and edition metadata.
- Specify exact HTML/PDF/API response shapes, allowlisted hosts, redirect rules, content limits, hashes, deterministic conversion, and fail-closed behavior.
- Resolve current text by preserving the official amendment chain; do not label the base Act as a consolidated current text.
- Capture parent-page forms and visa/mission routes, then replay offline to prove deterministic output.
- Run a live read-only smoke check separately from conversion testing; confirm no sensitive application or complaint submissions are fetched.
- Complete current-version checks for general procedure, remedies, oversight, data protection, legal aid, and the visa instruments.

Until these items are complete, Croatia remains discovery only. No source-rule verdict is assigned.

