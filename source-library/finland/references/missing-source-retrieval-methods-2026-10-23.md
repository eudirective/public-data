# Retrieval routes for unregistered Finland sources

**Checked:** 23 October 2026  
**Scope:** The user-supplied Finland ZIP audit: 19 unregistered candidates, the separately identified Information Management Act and Migri EU-family guidance, and optional Finnish-language copies of three shared EU instruments.

**Inventory baseline:** EU Source Update Monitor reported GitHub `main` at `1d4a488fca1ae6c10c43911eb5074986a70e763e`; its Finland README still reports 36 candidate records, eight accepted external Finlex references and no accepted local copies. The current candidate manifest/catalog also contains three related Migri EU-family public-page candidates, each still marked discovery-only. The named staff instruction below is a distinct, unresolved source question.

This is a retrieval-route note, not source acceptance or topic review. No new candidate rows, source copies, or accepted references are added by this note. The catalog's 36-record count and its separate acceptance counts therefore remain unchanged. A link or a route through a publisher index does not prove that a particular version was downloaded, reviewed, or current for a legal question.

## Where to retrieve the sources

### Finnish legislation

Finlex exposes each listed law through its official current-law page. Use the Finnish page as the controlling text, inspect its displayed current-version ELI and date, and retain the page's links to the original Statute Book item and amendment history when needed. The page is a usable external reference without a local capture. If a local copy is later required, follow the Finland-specific Finlex manifests and converters; do not assume the Akoma Ntoso API covers these acts. The existing Finland README records API 404s for several consolidated texts and documents the more brittle page-stream fallback for only three other acts.

| Audit candidate | Official retrieval page | Retrieval notes |
| --- | --- | --- |
| Constitution, 731/1999 | <https://www.finlex.fi/fi/lainsaadanto/1999/731> | Current Finnish text page; select its consolidated text and record the displayed ELI/date. |
| Electronic Administrative Services Act, 13/2003 | <https://www.finlex.fi/fi/lainsaadanto/2003/13> | Current Finnish text page. |
| Immigration Administration Personal Data Act, 615/2020 | <https://www.finlex.fi/fi/lainsaadanto/2020/615> | Current Finnish text page. |
| Border Guard Personal Data Act, 639/2019 | <https://www.finlex.fi/fi/lainsaadanto/2019/639> | Current Finnish text page. |
| Public Officials' Language Skills Act, 424/2003 | <https://www.finlex.fi/fi/lainsaadanto/2003/424> | Current Finnish text page. |
| Police Act, 872/2011 | <https://www.finlex.fi/fi/lainsaadanto/2011/872> | Current Finnish text page. |
| Police Administration Act, 110/1992 | <https://www.finlex.fi/fi/lainsaadanto/1992/110> | Current Finnish text page. |
| Reception Act, 746/2011 | <https://www.finlex.fi/fi/lainsaadanto/2011/746> | Finlex showed consolidation ELI dated 9 June 2026 during this review. Recheck the displayed date at retrieval. |
| Openness Decree, 1030/1999 | <https://www.finlex.fi/fi/lainsaadanto/1999/1030> | Finlex provides a current-text page, but parts of the decree were repealed. Identify surviving provisions and their relationship to Act 906/2019 before relying on this as current authority. |
| Information Management Act, 906/2019 | <https://www.finlex.fi/fi/lainsaadanto/2019/906> | Additional gap named by the ZIP audit. Finlex showed consolidation ELI dated 16 June 2026 during this review. |

Finlex's official open-data documentation is at <https://www.finlex.fi/en/open-data>. The API may be checked for an individual act, but a returned XML file needs identity and consolidation-date checks; the official current-law page remains the fallback and is enough for an external reference. Do not rebuild missing consolidation text from Gazette amendments unless a specific provision-level need requires it.

The audit's ten “overlap” files do not need duplicate source records: six Finnish laws are already represented in the catalog (301/2004, 621/1999, 616/2019, 808/2019, 1050/2018 and 423/2003), with Act 621/1999 appearing twice in the ZIP; three EU instruments already exist in shared-core English. Existing links do not accept the ZIP's local copies. Reconcile any actual package files separately, deduplicate 621/1999, and keep its retained-copy review separate from external-reference acceptance.

### Supreme Administrative Court

| Candidate | Official retrieval page | Retrieval notes |
| --- | --- | --- |
| KHO:2024:32, 15 March 2024 | <https://www.kho.fi/paatokset/kho202432/> | Official full decision page. The official annual precedent archive is <https://www.kho.fi/kho-paatokset/ennakkopaatokset/arkisto/>. Retrieve the exact case page, preserve its case number and date, and treat it as one selected precedent rather than a complete case-law search. The page is Finnish; no official English full text was located in this review. |

### Migri application instructions and public guidance

Start from Migri's official [English guidelines index](https://migri.fi/en/guidelines-for-application-of-law) or [Finnish application-guidance index](https://migri.fi/soveltamisohjeet). The Finnish index currently lists the target documents below and links the file attachments. Migri says these application-of-law guidelines are published only in Finnish because they are prepared for the agency's internal use. The English index route returned HTTP 503 in the research viewer, but the official search index exposed the page and the Finnish index's current list. For each PDF, follow the index link, record the document title, publication/revision date, Migri document number, validity statement and attachment URL from the PDF itself, then hash the exact downloaded bytes. Do not infer those fields from the filename alone.

| ZIP candidate | Retrieval route located | Currentness and retrieval status |
| --- | --- | --- |
| Child's best interests (audit copy dated 2026) | Finnish index entry: **Ohje lapsen asian käsittelystä – Lapsen etu -ohje**. Retrieve the PDF from the official index above. | Official index entry found; the direct PDF URL and the copy's document number/date were not verified in this review. Inspect its first and final pages before registering a version. |
| Removal from Finland (audit copy dated 2025) | Finnish index entry: **Ohje ulkomaalaisen maasta poistamisesta – Maastapoistamisohje.pdf**. Retrieve the PDF from the official index. | Official index entry found; exact PDF version/date not checked. The library should keep the decision to remove, enforcement process, and public-facing customer pages distinct. |
| Profiling (2025) | [Official PDF](https://migri.fi/documents/5202425/150086203/Profilointi+asian+selvitt%C3%A4misess%C3%A4,+p%C3%A4%C3%A4t%C3%B6ksenteossa+ja+ulkomaalaisvalvonnassa+(pdf).pdf/d606968d-76cf-ebdf-fd5f-b58eddfe7bbe?t=1752218657816) | Migri search index identifies **Profilointi asian selvittämisessä, päätöksenteossa ja ulkomaalaisvalvonnassa**, published 11 July 2025, reference MIG-2521602. Download and verify the PDF's internal document number/date before capture. |
| Circumvention of entry rules, Aliens Act §§36a–f (2025) | [Official PDF](https://migri.fi/documents/5202425/150086203/Ohje+maahantulos%C3%A4%C3%A4nn%C3%B6sten+kiert%C3%A4misen+arvioinnista+%E2%80%93+36+a-f+-ohje.pdf/2da5e5d0-2ee8-2b14-c5c7-454abafc2c25?t=1781519396424) | Migri's index lists **MIGDno-2025-1509**, with the underlying order dated 18 July 2025 and effective from 1 September 2025. The index result itself was dated 15 June 2026. Preserve both the order date/effective date and the page's publication/update date. |
| Means of support (2025) | [Official PDF](https://migri.fi/documents/5202425/150086203/Ohje+toimeentulon+selvitt%C3%A4misest%C3%A4+ja+toimeentuloedellytyksen+soveltamisesta+lupa-+ja++kansalaisuusasioissa+-+Toimeentulo-ohje+(pdf).pdf/d6fba998-bda6-70de-1e1e-7152f0ae74f7?t=1750337714935) | Migri's index identifies **Toimeentulo-ohje**, dated 19 June 2025, reference MIG-251767. Its combined permit and citizenship scope must be kept distinct from applicant-facing, route-specific means guidance. |
| Family-based residence permits (ZIP copy dated 2021) | Current Finnish index entry: **Oleskelulupa perhesiteen perusteella (pdf)**. Retrieve the presently listed PDF from the official index. | Current index entry found; no exact direct PDF locator or current document date was verified. Keep the 2021 ZIP copy as historical until compared with the current listed file. Do not assume it covers EU free-movement residence-card routes. |

The 2025 circumvention instruction and profiling/means PDFs have direct official locators from Migri's own indexed results. The other three direct PDF locators should be recovered by following the official index or its “Files” search filter; an index listing alone is not a local copy.

For the ZIP's `automation.pdf`, the maintainable route is the current official HTML pages [Automation](https://migri.fi/en/automation), [Automated decision](https://migri.fi/en/automated-decision), and [Frequently asked questions: Automation](https://migri.fi/en/faq-automation). Formal case-type implementation decisions are separate PDFs linked from [Criteria for automated decisions](https://migri.fi/en/implementation-decisions). Capture each needed page or decision as its own source; do not treat a print-to-PDF copy of a public web page as the implementation decision. The older ZIP PDF remains historical until its originating URL and capture date are matched.

The exact title **Euroopan unionin kansalaisen, häneen rinnastettavan sekä hänen perheenjäsenensä maassa oleskelu** was not found as a distinct current Migri instruction. The current manifest/catalog already has three related but unaccepted public-page candidates: [I am an EU citizen or a family member](https://migri.fi/en/i-am-an-eu-citizen-or-a-family-member), [Residence card for a family member of an EU citizen](https://migri.fi/residence-card-for-family-members), and [Application for a family member of an EU citizen](https://migri.fi/en/application-for-family-member). They are marked discovery-only and do not establish availability of the distinct instruction cited by the 2025 circular. Search the Migri guidance index by exact Finnish title and document number; if the staff instruction is needed and not listed, request a copy from Migri through its official records channel.

### Police instruction

The ZIP's **POL-2019-71117, Police Communications** is described in the audit as an expired order. Exact-number searches on Finlex's authority-norm pages, Poliisi.fi and the Ministry of the Interior did not return an official copy or current successor during this review. The available routes are:

1. Search the Police Board's official norm/document register by exact identifier and Finnish title **Määräys poliisin viestinnästä**.
2. If no public file is listed, ask the National Police Board registry for the signed order, its effective/expiry dates, any extension, and any replacing order.
3. Register it as historical only after the retrieved copy's identity and dates are checked; discover the successor separately before using it for current practice.

No records request was sent. The search result is “official web locator not found,” not proof that the order is unavailable.

### Visa-remedy notice

The ZIP filename **Rectification Request 2022 - FI.docx** did not resolve to an official public file. For current procedure use the Ministry for Foreign Affairs' official [A visa to visit Finland](https://um.fi/visa-to-visit-finland) page and the decision-specific appeal instructions. The MFA page currently describes the ordinary request-for-review route, a 30-day time limit, the stated fee, and the direct administrative-court route for EU free-movement family cases. The 2022 Word file is a historical notice only; do not use its former fee or route as current. If exact provenance is needed, search the originating Finnish mission page or request the dated notice from the MFA. No request was sent.

### Finnish-language EU instrument texts

The ZIP's Finnish texts for these shared instruments belong in the shared EU corpus, if acquired, rather than as duplicate national legislation files. EUR-Lex offers Finnish-language text by CELEX identifier:

| Instrument | Finnish-language EUR-Lex route | Retrieval caution |
| --- | --- | --- |
| Directive 2004/38/EC | <https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX%3A32004L0038> | Preserve the official Finnish text and any separate corrigenda; an original instrument page is not a consolidated text. |
| Visa Code, Regulation 810/2009 | <https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX%3A32009R0810> | The EUR-Lex English record showed a consolidated version dated 28 June 2024 and later 2026 provision-level suspensions. Resolve language/version and later-instrument dependencies before relying on a 2024 consolidation as current. |
| Schengen Borders Code, Regulation 2016/399 | <https://eur-lex.europa.eu/legal-content/FI/TXT/?uri=CELEX%3A32016R0399> | Select the latest available Finnish consolidated version and record its date, separate from the original Official Journal act. |

Use the shared language index to avoid duplicate EU texts. No Finnish national-language index was present in the checked checkout, so these would be new shared-corpus language files if accepted. Confirm that the Finnish representation matches the exact EUR-Lex version chosen before accepting it. The research viewer displayed a JavaScript verification interstitial on the direct EUR-Lex text URLs; use the official EUR-Lex browser interface if direct text retrieval is blocked. This is a viewer limitation, not a finding that EUR-Lex lacks the Finnish texts.

## Retrieval evidence and limits

- Finlex current-law routes were opened for the ten laws above. Finlex identified Act 746/2011's current ELI as dated 9 June 2026 and Act 906/2019's as dated 16 June 2026. Other acts' ELI dates must be recorded when the individual source is registered.
- Migri's official guidance index and search results exposed the current instruction titles and direct PDF URLs for profiling, means of support, and the §§36a–f circumvention instruction. The child-interest, removal, and family-ties items were visible in the official index but their exact current PDF URLs and document metadata were not inspected.
- The KHO decision page and annual archive were located on the court's official host.
- The MFA current visa page was located and inspected. It is a route for current procedural reference, not the ZIP's 2022 DOCX.
- EUR-Lex provided Finnish-language instrument routes. Check each instrument's latest language-specific consolidation and subsequent amendments/corrigenda at retrieval time.
- The exact Migri EU-family guide title and the 2022 DOCX filename returned no matching official file locator in this bounded search. The four exact `POL-2019-71117` searches returned no qualifying official copy. These findings are not exhaustive portal reviews.
- This checkout contains no `temp/finland/raw/` directory or `finland source package.zip`; existing Finland manifests refer to raw files under that temporary path. This only describes the checked `/tmp/eudirective-public-data-batch` checkout, not other folders or backups on the machine.
- The Source Update Monitor plugin lists no Finland source pack or Finland actions. Its mirror sync returned a verified snapshot at the baseline above, but mirror inventory and status calls still reported “not synchronized”; no Finland runtime checks or completion gates are claimed.

## Search record

Searches were run on 23 October 2026. Official-host queries used exact Finnish act numbers and titles on Finlex; the court number on `kho.fi`; Migri guideline titles and the official `soveltamisohjeet`/`guidelines-for-application-of-law` index; the exact Police order identifier on Finlex, Poliisi.fi and `intermin.fi`; the exact Word filename; CELEX identifiers on EUR-Lex; and the visa procedure on `um.fi`. Search results were screened for publisher, title/identifier, and whether the hit was a legal text, a guidance index, an attachment, or merely a related result. Official file links found above are lead locators pending the per-source identity/date checks in this note. No claim of exhaustive national-site discovery is made.
