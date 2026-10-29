# Legalize-CZ conversion and verification rules — Czechia

**Reviewed:** 29 October 2026  
**Scope:** The rule below is verified for one candidate only: Decree 429/2010. It does not authorize automatic acceptance of other Legalize-CZ files.

## Verified candidate

- **Instrument:** Vyhláška č. 429/2010 Sb.
- **Official publisher:** e-Sbírka, Czech Collection of Laws and International Treaties.
- **Official version:** effective 1 February 2020, incorporating Decree 67/2019: [official dated ELI](https://e-sbirka.gov.cz/eli/cz/sb/2010/429/2020-02-01).
- **Candidate:** [Legalize-CZ SB-2010-429.md](https://github.com/legalize-dev/legalize-cz/blob/f88290efc3062a7b4a56105193238c269816b613/cz/SB-2010-429.md), pinned at commit `f88290efc3062a7b4a56105193238c269816b613`, Git blob `9f86ae027ff3b12aacff28c59254853ccbd4a050`.
- **Accepted local copy:** [cz-decree-429-2010.md](../documents/legislation/cz-decree-429-2010.md).

## Conversion and comparison rule

1. Retain the Czech wording and every legal unit in the candidate. Remove only its YAML frontmatter and generated title heading when comparing legal text.
2. Normalize Markdown heading markers, list markers, and whitespace for comparison. Do not translate, paraphrase, reorder, correct wording, or suppress a section.
3. Compare the entire candidate legal body, from § 1 through the end of the annex, with the complete rendered e-Sbírka text for the same dated version. The comparison for this candidate matched §§ 1–3, the minister's signature, and all 42 annex entries exactly after the permitted formatting normalization.
4. The candidate omits the instrument number/date and the official enacting formula before § 1. Add those items only from the official e-Sbírka page; identify that supplementation in the local document.
5. Preserve the official cutoff (2020-02-01) separately from the Legalize repository commit and any `last_updated` field. Do not infer currentness for later dates from this comparison.
6. Record source and output hashes, candidate commit/path/blob, official ELI URL, the extent of the comparison, and any material added from the official source.

## Evidence and attribution

- Legalize candidate raw-file SHA-256: `2e2633898d0ba439a309a6bd15bbaaf5de878717b4dc42b5b76245f9bd847059`.
- Candidate legal-body SHA-256: `dac4654755df24bcb5342f8fe25f72e440cfccec646805d24f4405506dd2166c`.
- Extracted official legal-text SHA-256 used in the comparison: `f6e8563f6f2baa21310aa1b84aa2cc98fc500607e79ccbbd99f7dc7ce34a5e8b`.
- Accepted local-copy SHA-256: `493f6eb0d8e78499467452f527d1aaed19c8a707a91853d41846e693f3525ccc`.

Attribute the law to the Czech issuing authority and e-Sbírka. Identify Legalize-CZ as the intermediary Markdown transcription, not the authoritative publisher. The e-Sbírka consolidated text is labeled informative; the accepted copy is limited to the version effective 1 February 2020. This text comparison does not decide whether the decree's local-mission exceptions apply to EU-family short-stay visa or residence routes.

This verified result is specific to `SB-2010-429.md`. Treat all other Legalize-CZ candidates as unverified until their complete bodies are compared with the same version on the official source.
