# Bulgaria source-route sustainability assessment

Assessment date: 18 October 2026  
Skill: `assess-source-rule-sustainability` v0.2.0  
Pack maturity: discovery only; 35 candidates, 0 accepted; no Bulgaria retrieval or conversion rule is implemented.

## Assessment boundary

The sustainability rubric allows verdicts only for implemented rules whose behavior can be traced. Bulgaria has no such rule, so this report assigns no sustainability verdict or confidence. It records proposed-route evidence and implementation gaps separately. This is not a legal currentness determination or completeness claim.

## Proposed route evidence and missing implementation evidence

| Source cluster | Proposed route supported by evidence | Missing evidence before a rule could be called sustainable |
|---|---|---|
| EU free-movement law and forms | The MVR EU-citizen service page lists the dedicated Act, 2018 Instruction, residence applications, and declaration. The Act is distinct from the general Foreigners Act. | Direct PDF fetch was intermittently blocked; no archived response, identity validator, hash ledger, deterministic conversion, change detection, or form-version monitoring exists. The English translation is stale. |
| National visa rules | PRIS identifies the 2011 Ordinance and its 2025 amendment trail; the State Gazette provides the individual promulgated amendments. | MVR still links a 2019-only copy; PRIS attaches only the original 2011 files. No verified consolidated current text, complete version chain after October 2025, or reliable consolidation procedure was established. |
| MFA visa and mission guidance | A central MFA visa hub covers EU/EEA/Swiss family processing and links to prior consultations and mission channels. | No route-level identity check or recurring update policy; mission-specific rules and providers are volatile; the Annex 16 GUID changes and must be rediscovered via the hub. |
| Administrative procedure and remedies | Official MoJ numeric normdoc pages, Ombudsman, CPDP, discrimination commission, and Supreme Administrative Court routes were found. | Some endpoints were inaccessible or intermittent; no consistent capture/conversion behavior, complete appeal/deadline map, or integrated lower-court search coverage. |
| Privacy and applicant notices | MVR publishes EU notification procedure pages; CPDP publishes complaint information. | Applicant notice payloads can expose names and case details. Do not archive individual notices; any future implementation must restrict capture to index metadata and avoid personal data. |

## Cross-cutting sustainability risks

- Direct PDF URLs include upload IDs and filenames. Use the official parent index as a discovery route and validate the returned title, language, effective date, and body before preserving a new payload.
- The browser returned HTTP 403 for several direct MVR PDFs during this pass. A 403 is an access/client limitation, not a definitive source outage. Reaching the HTML index does not prove the payload can be fetched by the monitor's runtime.
- Legal currentness and retrieval must be separate. The stale visa PDF demonstrates why HTTP success or an official ministry domain is insufficient.
- Bulgarian text is the controlling source for most national rules. The English pages are supporting guidance and may lag terminology or amendments.
- No API, registration gate, or bulk-use permission was found in the bounded official-source searches. Terms and access conditions still require direct publisher review before choosing automated collection.
- Court search is fragmented below the Supreme Administrative Court. A successful query or empty result cannot establish complete case coverage.

## Minimum evidence for future rule review

1. Capture exact official parent-page and document responses, with the query date, URL, redirect chain, status, media type, byte count, and SHA-256.
2. Validate publisher identity, title, language, instrument number, version/amendment history, and legal status; fail closed on a stale or mismatched document.
3. Preserve source bytes and convert deterministic text from captured responses; replay conversion offline and compare output hashes.
4. Keep volatile HTTP validators outside deterministic output, and report missing, changed, blocked, or stale source states for human review.
5. Avoid applicant-specific and other personal data. Verify the publisher's access terms and any registration or automated-use restrictions before live retrieval.
6. Resolve the Visa Ordinance consolidation problem and confirm legal version coverage before any visa-law source is promoted.

## Conclusion

The official route evidence is useful for discovery, but the proposed paths are not yet implemented acquisition rules. The clearest sustainability blocker is the lack of a current consolidated Visa Ordinance at the otherwise official MVR and PRIS routes. All Bulgarian records remain candidates.
