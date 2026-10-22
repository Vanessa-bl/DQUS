# Blog content

Each article is a single `.mdx` file in this directory.

## Filename convention

```
<slug>.<locale>.mdx
```

- `<slug>` must match the `slug` in the frontmatter and is used in the URL (`/blog/<slug>`).
- `<locale>` is either `en` or `es`.
- A bilingual article is two files that share the same `<slug>`: for example `geo-marketing-explained.en.mdx` and `geo-marketing-explained.es.mdx`.

## Frontmatter

```yaml
---
title: "Headline, 50 to 60 characters"
description: "Meta description, 150 to 160 characters"
slug: your-slug-here
locale: en            # or es
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
category: Guide       # Blog | Guide | Case
tags:
  - tag-one
  - tag-two
coverImageAlt: "Describe the cover for accessibility and GEO."
directAnswer: "Two or three sentences that answer the title's question in plain terms. This is what AI engines extract. Put it before any marketing framing."
author:
  name: Author Name
  role: Author role
  bio: One sentence bio
relatedService:
  label: Related service name
  href: /services
faq:
  - question: "First FAQ question"
    answer: "First FAQ answer"
  - question: "Second FAQ question"
    answer: "Second FAQ answer"
---
```

## Body rules (GEO-first)

1. **Open with the direct answer, not a hook.** Two or three plain sentences that answer the title. This is what ChatGPT and Claude extract.
2. **`h2` sections are questions.** Write real questions a reader would type. Avoid clever headings.
3. **Cite real sources.** When you quote a number, add a date and a link to the primary source.
4. **Use tables and lists for comparable data.** Easier for AI engines to extract.
5. **Close with 3 to 5 FAQ entries** that mirror what you put in the `faq` frontmatter block.
6. **One `h1` only** (the title). Keep heading levels strict: `h2`, then `h3` under it, no skipping.

## Validation

The build fails loudly if a required field is missing. If both locales of the same slug exist, the one for the current locale is served.
