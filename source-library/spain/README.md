# Spain national source pack

**Status (24 October 2026):** 55 unique source records across the original national inventory and expanded 52-record monitor register; the inventories overlap on four records. Fifteen BOE law texts and 30 broader official pages were converted for review. Real Decreto 240/2007, Real Decreto 1155/2024, and Orden PRE/1490/2012 are three accepted local BOE documents under `documents/legislation/`; the remaining 12 BOE conversions and broader local conversions are still unaccepted. Twenty-five official external references remain accepted within their reviewed scopes. No topic is accepted, and the national review remains incomplete.

- [Original source list](references/source-list.md)
- [Original candidate manifest](references/candidate-manifest.json)
- [Expanded monitor source list](references/monitor-source-list-2026-10-18.md)
- [Expanded monitor candidate manifest](references/monitor-candidate-manifest-2026-10-18.json)
- [Expanded monitor capture ledger](references/monitor-candidate-manifest-2026-10-18-capture-results.json)
- [BOE retrieval manifest](references/boe-retrieval-manifest.json)
- [BOE retrieval and conversion rule](sync_boe.py)
- [Official reference acceptance](references/source-acceptance.json)
- [Issue-led coverage register](references/coverage-register.md)

The BOE API converter is an optional way to refresh local copies. The accepted BOE documents record displayed text dates separately from API metadata timestamps: Real Decreto 240/2007 (9 November 2015; metadata 19 December 2025), Real Decreto 1155/2024 (22 September 2026; metadata 2026-09-22T12:54:01Z), and Orden PRE/1490/2012 (10 July 2012; metadata 19 December 2025). BOE labels consolidations informational and without legal value; consult the linked official publication for legal effect. Local-copy acceptance does not establish topic coverage. The legacy verifier still reports stale conversion hashes for the 12 remaining BOE candidates; those remain unaccepted until reconciled.

The 18 October monitor run saved 34 responses from the initial 46 records: 30 converted, four dynamic pages had no stable text body, and 12 retrieval/conversion attempts failed. Those outcomes do not block public-link use. The 21 October review accepted 25 official references at the link level, including the BOE instruments, the distinct EU–Swiss treaty, current Spanish-national-family guidance, the National Police registration route, the Supreme Court judgment BOE-A-2026-19632, and Spanish Withdrawal Agreement procedure and family guidance. EUR-Lex’s current Withdrawal Agreement consolidation is offered for human review because its text view triggered an anti-bot check; Ministry EES/ETIAS rollout dates from 2024/2025 are flagged stale. The judgment affects parts of RD 1155/2024 Articles 94.1(f), 97.4 and 98.1; see the dependency map and coverage register. Other local candidate conversions remain unaccepted; the three accepted BOE texts passed separate local-artifact reviews. Real Decreto 1155/2024 remains distinct from the EU/EEA/Swiss free-movement route and preserves the 2026 Supreme Court annotations. Order PRE/1490/2012 preserves its 2012 wording and flags its Ley 30/1992 cross-reference for review with Ley 39/2015.

The Ministry, MAEC mission network, CGPJ/CENDOJ, Constitutional Court, and all autonomous-community portals are listed for human review where dynamic pages or full discovery work remain. A site-wide crawl, API, local capture, or conversion is not a prerequisite for reviewing a clear official public link.
