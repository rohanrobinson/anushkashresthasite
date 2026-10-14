/* Annotated skeleton for a new Ghar post. Copy the shape, not the placeholder
   words. The real reference implementation is MOOL_GHAR in src/blogPosts.tsx —
   read that for how long a section actually runs and how the voice sounds. */

// ---------------------------------------------------------------------------
// 1. At the top of src/blogPosts.tsx, beside the existing imports.
//    Name the binding by area + subject so the list stays scannable.
// ---------------------------------------------------------------------------
import gharNewPhoto from "./assets/ghar/new-photo.jpg"

// ---------------------------------------------------------------------------
// 2. The post object. Place it after the last existing post, before the
//    BLOG_POSTS export.
// ---------------------------------------------------------------------------
const NEW_POST: BlogPost = {
  slug: "new-post", // kebab-case, unique, this is the URL: #/blog/new-post
  tag: "Roots", // small uppercase label; reuse an existing tag when it fits
  title: "The Title",
  devanagari: "शीर्षक", // optional; sits above the romanised title
  date: "Oct 2, 2026", // "MMM D, YYYY" — no leading zero on the day
  readTime: "4 min read", // words / 220, rounded

  /* The record to put on while you read. `spotify` is the bare track id: the
     part of a Spotify URL after /track/ and before any ? query. */
  music: {
    spotify: "1CDZekYBi52KRJ8WoBlvXw",
    title: "Track Name",
    artist: "Artist Name",
    note: "press play. it is the correct soundtrack for this one.",
  },

  /* Intro paragraphs, before the first heading. Each array item is one
     paragraph, written as a JSX fragment so <em> and out() work inline. */
  intro: [
    <>
      The opening paragraph. Fragments mean you can {out("https://example.com", "link out")}{" "}
      or emphasise a <em>word</em> without leaving the array.
    </>,
    <>A second paragraph that hands off to the first section.</>,
  ],

  /* Sections: heading in the left rail, paragraphs in the column beside it.
     Posts so far run 4–7 sections. */
  sections: [
    {
      heading: "A plain heading",
      /* Optional photo in the left rail under the heading. Renders at 4:5, so
         portrait crops survive the crop best. Note the field is `src` here. */
      image: {
        src: gharNewPhoto,
        alt: "What is actually in the frame, for someone who cannot see it",
        caption: "short, dry, lowercase",
      },
      paragraphs: [
        <>First paragraph of the section.</>,
        <>Second paragraph.</>,
      ],
    },
    {
      /* A heading can be JSX when it carries Devanagari or a link. `ne()`
         handles the font and lang attribute; `month()` stacks a romanisation
         under the Devanagari for calendar-style headings. */
      heading: <>We call it {ne("घर")}</>,
      paragraphs: [<>A section with no rail image is fine.</>],
    },
  ],

  /* Closing paragraphs, after the last section. */
  outro: [<>The last word.</>],

  /* Five tiles — the grid is repeat(5, 1fr), so five fills exactly one row.
     Note the field is `image` here, not `src`, unlike a section image. */
  moodBoard: [
    {
      image: gharNewPhoto,
      alt: "What is in the frame",
      caption: "under ~60 characters so it sits on one line",
    },
    // ...four more
  ],
}

// ---------------------------------------------------------------------------
// 3. Register it. Skipping this makes the post unreachable: getPost returns
//    undefined and #/blog/new-post silently falls back to the front page.
// ---------------------------------------------------------------------------
export const BLOG_POSTS: BlogPost[] = [MOOL_GHAR, FESTIVAL_CALENDAR, NEW_POST]

// ---------------------------------------------------------------------------
// 4. The front-page card, in GHAR_POSTS in src/App.tsx. Different shape from
//    the BlogPost, and its text is not reused from it — write `body` as a
//    standalone pitch. `slug` is what makes the card clickable; without it the
//    card renders greyed out as a teaser.
// ---------------------------------------------------------------------------
const cardEntry = {
  image: gharNewPhoto,
  imageAlt: "What is in the frame",
  tag: "Roots", // match the post's tag
  slug: "new-post", // must match the post's slug exactly
  title: "The Title", // string, or JSX when part of it is Devanagari
  body:
    "Two to four sentences pitching the post to someone scrolling past. Not the intro paragraph.",
  date: "Oct 2, 2026", // match the post's date
}
