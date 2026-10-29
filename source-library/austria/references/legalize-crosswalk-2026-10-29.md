# Austria Legalize source crosswalk — 29 October 2026

## Scope and result

Reviewed the Legalize Austria repository at pinned main commit `30b7ded29545baa1079dc2ab8b2eef9193df3f59`. The repository describes its legislative content as automated reproductions of RIS federal consolidations and distinguishes the source-data license (CC BY 4.0) from its MIT-licensed pipeline. The repository snapshot is a retrieval route; RIS remains authoritative.

One overlapping complete statute was fully verified and copied into the source library: the Informationsfreiheitsgesetz (IFG), RIS Gesetzesnummer 20012537. All 20 section bodies were compared with existing accepted RIS captures; all 20 matched after removing repeated display labels and normalizing formatting only. The RIS consolidated version page was checked 29 October 2026 and listed the same latest amendment, BGBl. I Nr. 52/2025. See [the consolidated text](../documents/legislation/at-ifg-consolidated.md), [conversion rule](legalize-conversion-rules.md), and [acceptance record](source-acceptance.json).

## Other overlapping statute candidates

These files are recognized in the Legalize repository and correspond to statutes for which this pack already has section-level official sources. They are **not accepted as retrieval methods or local copies yet**: the exact current RIS consolidation and complete candidate bodies have not yet been compared.

| Statute | RIS number | Legalize file | Current comparison status |
|---|---:|---|---|
| Allgemeines Verwaltungsverfahrensgesetz (AVG) | 10005768 | `at/AT-10005768.md` | Pending full-body/current-version comparison |
| Fremdenpolizeigesetz (FPG) | 20004241 | `at/AT-20004241.md` | Pending full-body/current-version comparison |
| Niederlassungs- und Aufenthaltsgesetz (NAG) | 20004242 | `at/AT-20004242.md` | Pending full-body/current-version comparison |
| NAG-Durchführungsverordnung (NAG-DV) | 20004470 | `at/AT-20004470.md` | Pending full-body/current-version comparison |
| BFA-Verfahrensgesetz (BFA-VG) | 20007944 | `at/AT-20007944.md` | Pending full-body/current-version comparison |
| Verwaltungsgerichtsverfahrensgesetz (VwGVG) | 20008255 | `at/AT-20008255.md` | Pending full-body/current-version comparison |

This table is limited to the overlapping Austrian federal statutes identified from the existing source inventory. It does not assert an exhaustive search of every repository file or every Austrian legal source.
