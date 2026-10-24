# Spain national source pack

**Status (24 October 2026):** 55 unique candidate records across the original national inventory and expanded 52-record monitor register; the inventories overlap on four records. Fifteen BOE law texts and 30 broader official pages were converted for review. The BOE-converted text of Real Decreto 240/2007 is now one accepted local document under `documents/legislation/`; other local conversions remain unaccepted and in review. Twenty-five official external references remain accepted within their reviewed scopes. No topic is accepted, and the national review remains incomplete.

- [Original source list](references/source-list.md)
- [Original candidate manifest](references/candidate-manifest.json)
- [Expanded monitor source list](references/monitor-source-list-2026-10-18.md)
- [Expanded monitor candidate manifest](references/monitor-candidate-manifest-2026-10-18.json)
- [Expanded monitor capture ledger](references/monitor-candidate-manifest-2026-10-18-capture-results.json)
- [BOE retrieval manifest](references/boe-retrieval-manifest.json)
- [BOE retrieval and conversion rule](sync_boe.py)
- [Official reference acceptance](references/source-acceptance.json)
- [Issue-led coverage register](references/coverage-register.md)

The BOE API converter is an optional way to refresh local copies. The accepted Real Decreto 240/2007 document records BOE's displayed consolidated-text update (9 November 2015) separately from the API metadata update (19 December 2025). BOE labels consolidations informational and without legal value; consult the linked official publication for legal effect. Local-copy acceptance does not establish topic coverage.

The 18 October monitor run saved 34 responses from the initial 46 records: 30 converted, four dynamic pages had no stable text body, and 12 retrieval/conversion attempts failed. Those outcomes do not block public-link use. The 21 October review accepted 25 official references at the link level, including the BOE instruments, the distinct EU–Swiss treaty, current Spanish-national-family guidance, the National Police registration route, the Supreme Court judgment BOE-A-2026-19632, and Spanish Withdrawal Agreement procedure and family guidance. EUR-Lex’s current Withdrawal Agreement consolidation is offered for human review because its text view triggered an anti-bot check; Ministry EES/ETIAS rollout dates from 2024/2025 are flagged stale. The judgment affects parts of RD 1155/2024 Articles 94.1(f), 97.4 and 98.1; see the dependency map and coverage register. The other local candidate conversions remain unaccepted; the Real Decreto 240/2007 copy has passed its separate local-artifact review.

The Ministry, MAEC mission network, CGPJ/CENDOJ, Constitutional Court, and all autonomous-community portals are listed for human review where dynamic pages or full discovery work remain. A site-wide crawl, API, local capture, or conversion is not a prerequisite for reviewing a clear official public link.
