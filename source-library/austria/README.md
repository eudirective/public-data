# Austria national source pack

**Status (19 October 2026):** all 37 declared records have an official response captured; 35 are Markdown review candidates and two are native PDF review candidates. Zero sources are accepted.

This is a bounded discovery pack for Austrian free-movement and family-member residence, visa and consular routes, administrative procedure, file access, remedies, public-information access, and selected administrative-court decisions. It records N-Lex as a discovery route to RIS and EUR-Lex, not as an authoritative publisher. It is not an exhaustive inventory of Austrian law or local administrative practice.

- Candidate inventory: [manifest](references/candidate-manifest.json)
- Retrieval evidence: [capture ledger](references/capture-ledger.json)
- Per-source retrieval and conversion rules: [source rules](references/source-rules.json)
- Human-readable inventory and discovery log: [source list](references/source-list.md)
- Sustainability findings and open coverage gaps: [assessment](references/sustainability-assessment.md)
- German-language EU and CJEU references: [Austria shared-core index](references/shared-core.json), pointing to the canonical [German source index](../shared-core-index-DE.json)
- Offline RIS converter: [scripts/convert_ris_capture.py](scripts/convert_ris_capture.py)

Austria has no country-local `core/` directory. Shared German material is referenced once through the library-level index; the entries currently link to official publishers and are not locally mirrored. Individual EUR-Lex German-language availability remains unverified for most records.

The converter works only with saved captures. It does not fetch from RIS, does not accept sources, and does not certify legal currentness. The source rules specify manual review intervals; there is no scheduled Austria sync job. Candidate changes must remain staged for human review. Keep the last reviewed source unchanged when retrieval, identity checks, or conversion fail.

The two NAG-DV Annex E/F forms are retained in their native PDF format under `candidates/forms/`. Their visual/form content is not represented as text-only Markdown.
