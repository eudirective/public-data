Skill: assess-source-rule-sustainability v0.2.0

# Germany source-route sustainability assessment

Status date: 18 October 2026  
State: discovery-only candidates; 47 candidates, zero accepted, and no Germany retrieval or conversion rule implemented.

## Assessment boundary

The [candidate manifest](candidate-manifest.json) covers federal legal-publication channels; residence/visa/mission sources; civil status/adoption; procedure/remedies; courts; privacy/oversight; public access and legal aid. Hesse and Bremen are regional samples only. No source bytes were saved or converted. This search is bounded and does not exhaust 16 Länder, municipalities, missions or courts.

There is no implemented Germany source rule to rate. This report assigns **no sustainability verdict**. It assesses proposed routes and missing implementation evidence only.

## Strongest proposed route: authentic publication plus consolidated text

The official federal gazette is the electronic Bundesgesetzblatt at `recht.bund.de`. The Federal Ministry of Justice says it has been the sole federal promulgation organ since 1 January 2023. Its official service documents stable ELI-style issue paths, rule-text and annex PDFs, ZIP issue packages, response-code checks and RSS feeds. This is a plausible no-registration route for discovering and preserving authentic federal promulgation events.

`Gesetze im Internet` provides free, continuously consolidated federal statutes and regulations, with HTML, PDF and often XML ZIP/EPUB formats. The displayed consolidation is not the authentic promulgated version. N-Lex’s Germany profile says only the printed BGBl is official, but current BMJ information says the electronic BGBl is the sole official federal publication from 2023. Treat the N-Lex statement as stale; use the responsible publisher’s current publication information.

A future monitor could pair BGBl ELI/RSS discovery with each law’s current consolidated record. Feasibility is plausible but unproven: no issue enumeration, feed completeness, electronic seal verification, XML schema replay, text extraction, or publication/effect-date reconciliation was implemented.

## Currentness risks

The official FreizügG/EU text visibly records amendment by 16 July 2026, BGBl. 2026 I No. 213. The AufenthG result records an amendment by 22 July 2026 and also flags text that was textually evidenced but not yet fully processed by the documentation service. A stable consolidated URL or unchanged date stamp cannot establish that every amendment has been incorporated. Keep the authentic issue, amendment provision, effect date, consolidated record and any editorial caveat together.

The publication chain has two different payload types: authentic BGBl PDFs/ZIPs and separately maintained consolidated HTML/XML. PDF is durable and authentic but requires seal validation and careful deterministic extraction. XML may be easier to convert but needs schema and version checks. RSS is a discovery signal, not an authoritative text or archive by itself.

## Other proposed routes and limits

| Source group | Maturity | Proposed route evidence | Main unresolved sustainability issue |
|---|---|---|---|
| Federal legislation | Discovery-only | BGBl ELI/RSS, official PDF/ZIP issues, Gesetze im Internet HTML/XML ZIP | Feed completeness, signature checks, identity, schema, amendment/effective dates, editorial lag and offline conversion are unimplemented. |
| EU movement and immigration | Discovery-only | FreizügG/EU, AufenthG, AufenthV | Distinguish EU, EEA, Swiss, UK-transition and German-citizen routes. AufenthG has a currentness caveat. No historical-version or amendment-chain handling exists. |
| Visas and mission practice | Discovery-only | AA guidance, Visa Handbook, Consular Services Portal, mission directory, AABGebV | Portal coverage and local instructions change by mission; fees change; stable PDF URLs may mask new content. Public metadata only; no personal application data. |
| Administrative procedure/remedies | Discovery-only | VwVfG § 2, VwGO, IFG, AA procedure notice | Federal missions are excluded from direct VwVfG application. Remonstration ended 1 July 2025. Remedies and deadlines remain notice-specific. |
| Residence service practice | Discovery-only | Bundesportal region selector plus Hesse/Bremen samples | Land/local records vary. Hesse is dated 2020; Bremen full page needs review. Nationwide coverage is absent. |
| Civil status/adoption | Discovery-only | PStG/PStV, EGBGB, FamFG, AdWirkG, AdVermiG, AdÜbAG and BfJ | Most statutes are carried candidates awaiting text/version inspection. Federal and Land responsibilities differ. |
| Courts/case law | Discovery-only | BVerwG decision search/ECLI and VG Berlin guidance | Publication is selective; one court’s material is not nationwide or complete lower-court coverage. |
| Privacy/information access | Discovery-only | BfDI contact finder, IFG guidance and annual report | Federal vs Land authority depends on controller. Annual reports are historical, not current complaint instructions. |
| Legal aid | Discovery-only | Justiz-Services Prozesskostenhilfe and Beratungshilfe | Forms may collect sensitive financial details. Monitor public information only; do not submit or retain case data. |

## Scope and procedure caveats

FreizügG/EU is a partial functional match to the Danish EU-residence seed, not an equivalent instrument. German-citizen family routes under AufenthG are distinct. Swiss nationals rely on a separate EU–Switzerland route; EEA and UK Withdrawal Agreement provisions need separate scope. No relationship label is a legal-equivalence conclusion.

Visa processing involves the Federal Foreign Office and missions; residence documentation involves Länder and local immigration authorities. Bundesportal content varies by region. BfDI competence also depends on the responsible controller. Do not treat a federal source as complete local practice.

The AA states that voluntary visa remonstration was abolished worldwide on 1 July 2025 while judicial review remains available. Use refusal notices and applicable law for the remedy and deadline; Berlin court material is local guidance only.

## Repair priorities before implementing or accepting a rule

1. Capture authentic BGBl issues by ELI identity. Preserve raw PDF/ZIP bytes, hash, seal metadata, issue number, annexes, publication and commencement dates.
2. Reconcile those publications with Gesetze im Internet current HTML/XML ZIP for FreizügG/EU, AufenthG and AufenthV. Pin law ID, XML schema, encoding and version fields; record editorial lag rather than reporting a clean current-text check.
3. Establish ELI/RSS completeness and recovery behavior, including duplicate events, issue gaps, corrections, republished issues and timeouts. Validate digital seals before extracting text.
4. Build deterministic conversion fixtures for a plain rule, amendment, annex and corrected publication. Fail closed on invalid seal, incomplete package, unknown schema, identity mismatch or unresolved current-text conflict.
5. Recrawl AA, mission, Bundesportal, BfDI, BfJ and court pages through constrained parent links; record visible dates and redirects. Never automate visa or legal-aid submissions.
6. Expand residence, court, privacy/oversight and legal-aid discovery across all Länder before claiming nationwide service coverage. Keep EU, EEA, Swiss and German-citizen family routes distinct.
7. Recheck the 2025 remonstration change against current AA guidance before writing procedural adapters.

## Coverage limits

The search found official leads in each requested broad class, but many carried statutes were not reopened. There is no raw-source archive, conversion, or live monitor. BGBl feeds and seals were not exercised. Mission-specific rules, all 16 Länder, local authorities, comprehensive lower-court case law, full adoption/civil-status workflows, and current legal-aid forms remain open. No absence claim or source acceptance is made.
