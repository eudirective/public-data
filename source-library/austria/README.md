# Austria national-source candidates

The 37-record Austria register covers NAG free-movement sections and authority/venue rules, Swiss eligibility, NAG-DV Annex E/F, IFG access and DSB oversight, general remedies, sample administrative-court decisions, central BMEIA visa/residence guidance, visa-application guidance, and BMEIA's representation directory. Thirty-five texts now have unaccepted review-candidate conversions; the two official Annex E/F PDF payloads are linked from RIS but their bytes are not captured. Nothing is accepted, and no Austria action is exposed by the monitor MCP. Mission-specific instructions and broad court-search coverage remain open.

The saved RIS HTML responses contain the operative text inside `div.contentBlock`. [`convert_ris_capture.py`](convert_ris_capture.py) converts the exact saved responses offline, checks source and output hashes, and replays its own 26 conversions. The other nine existing page outputs are hash-checked by this verifier. This is a conversion rule, not a recurring retrieval/sync rule; the selector is publisher-specific and undocumented, so treat it as fragile until RIS provides a stable documented format for these texts. Raw responses remain under the ignored repository `temp/austria/raw/` path.

Run `python3 convert_ris_capture.py convert` to convert any remaining saved RIS responses and `python3 convert_ris_capture.py verify` for offline hash/replay checks. These commands do not fetch from RIS.

- Candidate register and search log: [`references/source-list.md`](references/source-list.md)
- Candidate metadata: [`references/candidate-manifest.json`](references/candidate-manifest.json)
- Source-rule assessment: [`references/sustainability-assessment.md`](references/sustainability-assessment.md)
- Country sequence and coverage state: [`../references/eea-switzerland-country-expansion.md`](../references/eea-switzerland-country-expansion.md)

The initial comparison seed is Denmark's EU-residence regulation. Austria's national law and guidance are recorded by function and scope; no legal equivalence is asserted.
