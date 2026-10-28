# Latvia official-source review

This directory contains Latvia’s official-source register, scoped external-link decisions, 42 accepted local text snapshots, and a retrieval/conversion prototype. The source-acceptance register is authoritative for current decisions; the candidate manifest preserves the earlier discovery-stage inventory. No topic is accepted as adequately covered and the country review is incomplete.

- Source inventory: [references/candidate-manifest.json](references/candidate-manifest.json)
- Current source acceptance: [references/source-acceptance.json](references/source-acceptance.json)
- Issue-led coverage: [references/coverage-register.md](references/coverage-register.md)
- Legal dependencies: [references/dependency-register.json](references/dependency-register.json)
- Human-readable register: [references/source-list.md](references/source-list.md)
- Proposed-route sustainability review: [references/sustainability-assessment.md](references/sustainability-assessment.md)

Latvia is an EU Member State. The 52-record inventory distinguishes EU/EEA/Swiss free movement, UK Withdrawal Agreement beneficiaries, and third-country immigration. As of 28 October 2026, 51 official links are accepted within narrow recorded scopes, one remains pending, none are marked not relied upon, and 42 local text snapshots are accepted. Twelve local-copy promotions were added in this batch and the existing PMLP parent forms index (lv-21) was refreshed. Several earlier PMLP and MFA pages are accepted only as historical snapshots because they predate the 2026 free-movement or Immigration Acts. The current EU-family application PDF is the attachment linked from the PMLP parent index on 23 October 2026; the older /media/100/download file remains unaccepted.

The current free-movement Act took effect on 10 July 2026. Its transitional text, the displayed validity of Cabinet Regulation 675 through 2 December 2027, and the new rule-making deadline leave Regulation 675’s application to post-commencement filings unresolved. The MFA page still describes Regulation 675; the current PMLP overview points to the new Act, and the current forms index links the updated application form. See the acceptance, coverage, and dependency registers before relying on operational instructions.

The source pack’s [capture manifest](references/latvia-captures.json) preserves the earlier capture set. Raw and derived files from the 28 October promotion review and its decision manifest remain in the Monitor’s local-only archive; they are excluded from this public pack. The Gazette PDF OP 2026/119.1 and the current PMLP application PDF are stored with page-wise text extractions under documents/. Court entries remain repository/search routes rather than accepted individual decisions. Local-copy acceptance is separate from external-link acceptance, topic coverage, and country completion.

Run python3 sync_latvia.py verify to check saved source hashes and replay accepted local text copies without modifying them. reconvert and convert-pdfs stage unaccepted conversions under the temp workspace; they do not replace or accept documents. PDF tooling is pinned in requirements.txt. These commands do not retrieve sources or establish source-monitor coverage.

Ordinary HTTPS links to official consolidated texts remain usable; publisher reuse terms and fees concern recurring retained copies. No scheduled updater is proposed here. See the [sustainability assessment](references/sustainability-assessment.md) for the separate capture and reuse review.
