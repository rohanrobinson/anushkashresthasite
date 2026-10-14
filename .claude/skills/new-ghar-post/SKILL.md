---
name: new-ghar-post
description: Add a new long-form Ghar blog post to this site end to end — the BlogPost object in src/blogPosts.tsx, the BLOG_POSTS registration, the image imports, and the matching GHAR_POSTS card in src/App.tsx that links to it. Use this skill whenever the user wants to add, draft, scaffold, publish or wire up a blog post, a Ghar post, a new entry under "Ghar", or a post page at #/blog/<slug>, and also when they want to turn an existing teaser card into a real post, change a published post's sections, music, mood board or hero card, or ask why a post is not showing up or not clickable. Trigger even if they only say "new post" or name the title without saying "blog".
---

# Adding a Ghar blog post

A post is not one file. It is a `BlogPost` object, a registration, a set of
image imports, and a card on the front page — and the thing that actually
breaks is the seam between them: a post with no card is unreachable, a card
with no matching slug renders as a dead teaser. So treat the four edits below
as one unit of work and finish all of them before saying the post is done.

Write the wiring yourself. Do not write the prose. The voice on this site is
specific and personal, so ask for the words rather than inventing them — see
**Getting the content** below for how to ask without making it feel like a form.

## The four places a post lives

1. `src/assets/ghar/` (or `src/assets/mood/`) — the image files.
2. `src/blogPosts.tsx` — image imports at the top, then a `const MY_POST: BlogPost = {...}`.
3. `src/blogPosts.tsx` bottom — the slug added to `export const BLOG_POSTS`.
   Without this `getPost` returns undefined and the URL falls back to the front page.
4. `src/App.tsx` — an entry in `GHAR_POSTS` whose `slug` matches exactly.
   This card is the only way in; routing is hash-only (`#/blog/<slug>`) and there
   is no index page that lists posts automatically.

Read `references/post-template.tsx` for the annotated skeleton to copy, and
read the existing `MOOL_GHAR` object in `src/blogPosts.tsx` for a worked example
at full length before writing a new one.

## Getting the content

Ask for what you cannot derive, in one pass, conversationally — not as a
numbered interrogation. What you need:

- **Title**, and the Devanagari for it if it has one.
- **Tag** — the small uppercase label on the card and in the post rail
  ("Origin Story", "Festivals", "Roots"). Reuse an existing tag when it fits.
- **Date** — ask only if it is not today. Format is `"Jul 30, 2026"` exactly:
  three-letter month, no leading zero on the day.
- **The record** — a Spotify track. The user may paste a track URL; the
  `spotify` field is just the id, the part after `/track/` and before any `?`.
  The `note` is a lowercase aside telling the reader to press play.
- **Intro, sections, outro** — their words. A section is a heading plus two or
  three paragraphs; posts so far run 4–7 sections.
- **Images** — which files for the section rails and which five for the mood
  board, each with alt text and a short caption.

Derive the rest:

- **slug** — kebab-case from the title, no Devanagari, and it must be unique
  across `BLOG_POSTS`. Check before using it.
- **readTime** — count the words in intro + sections + outro and divide by 220,
  rounded to a whole minute: `"4 min read"`. 220 is the screen reading rate this
  site uses deliberately; print-style 300 overstates how fast people get through
  a page like this.

If the user hands you a draft in prose or a document, pull the headings and
paragraphs out of it yourself and only ask about what the draft does not cover
(usually the music, the images and the tag).

## Images

Put new files under `src/assets/ghar/` with descriptive kebab-case names
(`mool-ghar-facade.jpg`), import them at the top of `src/blogPosts.tsx`, and
name the binding by area and subject: `gharFacade`, `moodPujaMarigold`. Reusing
an already-imported image across posts is normal and fine — check the existing
imports before asking the user for a new photo.

Two shapes, and they differ:

- A **section** image is an object — `{ src, alt, caption? }` — and renders in
  the left rail at 4:5, so portrait crops work best.
- A **mood board** image is `{ image, alt, caption }` — note `image`, not `src`.
  The grid is `repeat(5, 1fr)`, so **five tiles fill exactly one row**. Both
  existing posts use five; another count leaves a ragged row.

Alt text describes what is in the frame for someone who cannot see it. Captions
are the voice of the site — short, dry, lowercase, under about 60 characters so
they sit on one line.

## The card in App.tsx

The `GHAR_POSTS` entry is a different shape from the `BlogPost` and its text is
not reused from it, so write a card body that works as a standalone pitch
(~2–4 sentences) rather than pasting the intro:

```
{ image, imageAlt, tag, slug, title, body, date }
```

`slug` is what makes it clickable — omit it and the card renders greyed out as
a teaser with no link, which is how the "No, it does not snow where I am from"
entry currently sits. If the user is turning a teaser into a real post, add the
`slug` to the existing entry instead of adding a second card, and keep its
`date` and `tag` consistent with the `BlogPost` you just wrote.

`title` may be a string, or JSX when part of it is Devanagari — in that case
wrap the Devanagari span the way the `festival-calendar` card does.

## House rules that break the build

- Use double quotes for any string containing an apostrophe (`"it's"`). An
  unescaped apostrophe in a single-quoted string is a syntax error.
- Prose lives in JSX fragments (`<>...</>`), so `<em>`, `<strong>` and the local
  `out(href, text)` helper for external links all work inside a paragraph.
  `out` opens in a new tab so the reader does not lose their place.
- `ne(text)` wraps Devanagari in the right font and `lang="ne"`. Use it rather
  than inlining the style; the `month(nepali, roman)` helper is for calendar-style
  headings that stack a romanisation under the Devanagari.
- Keep the file's comment style: short notes explaining *why* a choice was made,
  not restatements of the code.

## Finishing

Run `npx tsc --noEmit` to catch a missing field or a mistyped import, then
`npm run build`. Both should be clean. Offer `npm run format` (oxfmt) if the
new code's formatting drifted from the file.

Then tell the user the post is live at `#/blog/<slug>` — the dev server hot
reloads, so they can open it straight away — and say plainly which of the four
edits you made, so they can see nothing was left half-wired.
