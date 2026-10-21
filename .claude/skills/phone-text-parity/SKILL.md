---
name: phone-text-parity
description: Keep text on this site reading the same on every smartphone — the same line breaks, the same proportions — as it does on the reference phone (iPhone 14 Pro Max, 430px wide), using the .phone-fit utility in src/index.css and a checker that renders the page at every common phone width. Use this skill for ANY change to text or text styling that shows on phones in this repo: a new heading, tagline, blurb, footer, label, button or nav text; changing copy that sits on a phone layout; font-size, spacing or line-height changes under the 640px breakpoint; and whenever the user sends a phone screenshot and says they like how something looks, wants it to "stay like this", "look the same on every phone", "stay on one line / three lines", or complains that text wraps, breaks, squishes or overflows differently on another phone. Trigger even when the user only mentions mobile, iPhone, Android or "small screens" in passing while editing copy.
---

# Phone text parity

The owner of this site checks it on an iPhone 14 Pro Max and approves what
she sees there. Visitors arrive on everything from a 320px Android to a 440px
Pro Max, and ordinary CSS lets each of those phones re-wrap the text its own
way. A line breaks one word earlier, a ~ drops onto its own line, a
copyright slips under a name. Each phone ends up with a slightly different
site, and none of them is the one she approved.

The rule this skill enforces: **on a phone, the author decides where lines
break, and the screen decides only the size.** Text keeps exactly the lines
it has at 430px. On a narrower phone the whole block scales down
proportionally until its widest line fits; it never re-wraps. On a wider
phone it stays at its designed size. Desktop (above 640px) is left alone.

## When to apply it, and when not

Apply it to short, designed text whose shape matters:
- headings and subtitles
- taglines and blurbs
- footer rows and label rows
- buttons and nav items
- anything the owner has screenshotted and said she likes

Don't force it on running prose: blog paragraphs, long descriptions, or
anything over about four lines. Scaling a paragraph down to keep its 430px
line breaks would make it tiny on small phones. Prose should wrap naturally,
and that's fine because nobody reads a paragraph for its line breaks.

Use a size floor as the test. Check what font-size the smallest text in the
block would get at 360px, the narrowest common phone today (see the formula
below). If it would fall below about 11px, the line is too long to hold on a
small phone. Tell the owner, and offer either a shorter line or a deliberate
extra break, rather than quietly shipping small text. 320px phones (the
first iPhone SE, older small Androids) are rare. Mention how small the
text gets there, but don't let them decide the design.

## How the utility works

`.phone-fit` is defined at the very end of `src/index.css`. That placement
is deliberate: it must win over a component's own font-size, so don't add
rules after it. Inside the `max-width: 640px` breakpoint it:

- sets `white-space: nowrap`, so the only line breaks are the ones in the
  markup
- sets `font-size: min(var(--fit-size), calc((100vw - var(--fit-gutter, 4rem)) / var(--fit-em)))`

The component supplies three numbers, inside its own `@media (max-width:
640px)` rule:

| variable | meaning |
|---|---|
| `--fit-size` | the designed font-size, i.e. what the 430px phone shows |
| `--fit-em` | the widest line measured in ems of that size, plus about 3% slack |
| `--fit-gutter` | total horizontal padding around the block (left + right); defaults to `4rem`, the site's 2rem page gutters |

So the font-size on a given phone is `(screen width − gutter) ÷ fit-em`,
capped at `fit-size`. At 320px with a 4rem gutter that is `256 ÷ fit-em`.
Use this to check the 11px floor.

## Steps

1. **Pin down the reference look.** If the owner sent a screenshot, list
   exactly which words sit on which line. Treat anything that only wrapped
   by accident at 430px (like a "~" pushed onto its own line) as part of
   the approved design, since that's what she saw. Ask if you're unsure
   which lines she means. If there's no screenshot, render it at 430px
   (step 5) and treat that as the reference.

2. **Make every line explicit in the markup.** Put each line in a
   `<span>` with `display: block` (the site uses classes like
   `.mood-blurb-line`) instead of `<br>`, or instead of hoping the width
   breaks it. For a row of side-by-side items (a flex row), one line is the
   whole row. Give the row a gap in `em`, so the spacing scales with the
   text, and keep the gap at about what 430px showed.

3. **Size children in `em`, not `rem` or `px`.** Put `.phone-fit` on the
   container, and size each child relative to it. For example, the footer
   uses `1em` for the name and `0.8125em` for the copyright. That way the
   whole block scales as one piece and the proportions hold. An inline
   `style={{ fontSize: "1rem" }}` on the `.phone-fit` element itself will
   beat the class, so move that size into `--fit-size` instead.

4. **Measure the widest line and set `--fit-em`.** Measure at the designed
   size with web fonts loaded. You can use devtools, or a quick script that
   sets `white-space: nowrap` on each line and reads
   `getBoundingClientRect().width`. Divide that width by the font-size in
   px, then add about 3%: Safari's text metrics run slightly wider than
   Chrome's. For a flex row, the width is the sum of the items plus the
   gap. Put the measured number in a comment next to the variables, as
   the existing rules do, so the next edit can update it.

5. **Verify at every phone width.** Run the bundled checker against the
   running dev server. It's Vite, on port 8443 by default. The checker
   needs `puppeteer-core` and a local Chrome, so install them into a
   scratch folder rather than the project:

   ```sh
   npm i --prefix <scratch> puppeteer-core@23
   cp .claude/skills/phone-text-parity/scripts/check-phones.mjs <scratch>/
   cd <scratch> && node check-phones.mjs --out <scratch> [--hash "#/blog/<slug>"]
   ```

   It renders 320, 360, 375, 390, 393, 402, 412, 414, 428, 430 and 440px.
   For every `.phone-fit` block it checks:
   - the block has the same number of visual lines as at 430px
   - nothing pokes past the screen edge
   - the page never scrolls sideways

   It exits non-zero if any of those fail. It also saves screenshots of
   each block at 320px and 430px. Look at both images, and don't call the
   change done on the numbers alone. If you edited something that isn't
   `.phone-fit` yet, pass `--select "<css selector>"` to see how it
   behaves today.

6. **Report like a person would see it.** Tell the owner what the text now
   looks like on her phone and on the smallest phones. Include the actual
   font sizes at 320px and 430px, so she knows how small it gets.

## Where it's used today

- **Mood board blurb** (`.mood-blurb` in `App.tsx`): three lines, with
  the ~ on its own line between the first two. `--fit-size: 1.125rem`,
  `--fit-em: 20.5`.
- **Footer row** (`.site-footer-row`): the name and the copyright on one
  row. `--fit-size: 1rem`, `--fit-em: 23` (21.2em of text plus a 1.6em
  gap).

When you change the words in either of these, re-measure and update
`--fit-em`. A longer line with a stale `--fit-em` overflows on small phones.
