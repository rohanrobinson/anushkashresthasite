import type { ReactNode } from "react";

import gharMoolGhar from "./assets/ghar/mool-ghar-diyo.jpg";
import gharPatanAerial from "./assets/ghar/mangal-bazar-patan.jpg";
import moodPujaMarigold from "./assets/mood/02-puja-marigold.jpg";
import gharDashain from "./assets/ghar/dashain-tika-dog.jpg";
import gharGosaikunda from "./assets/ghar/rasuwa-gosaikunda.jpg";
import gharTrekking from "./assets/ghar/trekking-pass.jpg";
import gharPikhaLakhu from "./assets/ghar/pikha-lakhu-puja.jpg";
import gharChowk from "./assets/ghar/chowk-temple-square.jpg";
import gharHimalHome from "./assets/ghar/himal-home-diyo.jpg";
import gharIhi from "./assets/ghar/ihi-with-baba.jpg";
import gharBahra from "./assets/ghar/bahra-with-baba.jpg";
import musicRosePuja from "./assets/ghar/music-rose-puja.jpg";
import patanAerialVideo from "./assets/hero/patan-durbar-aerial.mp4";
import patanAerialPoster from "./assets/hero/patan-durbar-aerial.jpg";
import gharFacade from "./assets/ghar/mool-ghar-facade.jpg";
import gharPujaThali from "./assets/ghar/puja-thali-rose.jpg";
import moodNewarTattoo from "./assets/mood/01-newar-tattoo.jpg";
import lakeWater from "./assets/hero/water.jpg";
import basecamp from "./assets/footer-media/basecamp-2021.jpg";
import moolGharMood01 from "./assets/ghar/MG/mg-01.jpg";
import moolGharMood02 from "./assets/ghar/MG/mg-02.jpg";
import moolGharMood03 from "./assets/ghar/MG/mg-03.jpg";
import moolGharMood04 from "./assets/ghar/MG/mg-04.jpg";
import moolGharMood05 from "./assets/ghar/MG/mg-05.jpg";
import moolGharMood06 from "./assets/ghar/MG/mg-06.jpg";
import moolGharMood07 from "./assets/ghar/MG/mg-07.jpg";
import moolGharMood08 from "./assets/ghar/MG/mg-08.jpg";
import moolGharMood09 from "./assets/ghar/MG/mg-09.jpg";
import moolGharMood10 from "./assets/ghar/MG/mg-10.jpg";
import moolGharMood11 from "./assets/ghar/MG/mg-11.jpg";
import moolGharMood12 from "./assets/ghar/MG/mg-12.jpg";
import moolGharMood13 from "./assets/ghar/MG/mg-13.jpg";
import moolGharMood14 from "./assets/ghar/MG/mg-14.jpg";
import moolGharMood15 from "./assets/ghar/MG/mg-15.jpg";
import moodLinenAnklets from "./assets/mood/13-linen-anklets.jpg";

export type BlogSection = {
  heading: ReactNode;
  paragraphs: ReactNode[];
  /* Optional photo for the section. It fills the section's band behind the
     text, so `position` is the CSS background-position that keeps the part
     that matters (usually faces) in frame when the band is wide and short. */
  image?: {
    src: string;
    alt: string;
    caption?: string;
    position?: string;
  };
};

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  devanagari?: string;
  date: string;
  /* Counted at roughly 220 words a minute, the rate people actually read a
     screen at rather than the 300 a print estimate assumes. */
  readTime: string;
  /* The record to put on while you read. `youtube` is the video id the "play"
     link points at. Keep `note` short — title, artist and note share one line
     on the page. */
  music: {
    youtube: string;
    /* Optional photo behind the listen card, under a dark wash. */
    backdrop?: string;
    /* Leave the artist out of the visible line (it stays in the link label
       for screen readers). */
    hideArtist?: boolean;
    title: string;
    artist: string;
    note: string;
  };
  intro: ReactNode[];
  /* Optional looping footage behind the header and intro. It fills one
     full-width band the way a section photo does; `poster` shows while it
     loads and stands in for it when the reader prefers reduced motion. */
  introVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  sections: BlogSection[];
  outro: ReactNode[];
  /* "strip" (the default) crops every tile to one short row; "square" crops
     every photo to a square in an even grid, for a bigger board of mixed
     shapes. */
  moodBoardLayout?: "strip" | "square";
  /* Heading over the board; falls back to a generic one. */
  moodBoardTitle?: string;
  /* Columns for the "square" board on a wider screen (5 by default); pick
     one that divides the photo count so the grid closes evenly. */
  moodBoardColumns?: number;
  /* On a phone, show the board as a swipeable carousel instead of a grid.
     Desktop keeps the grid either way. */
  moodBoardCarousel?: boolean;
  moodBoard: {
    image: string;
    alt: string;
    caption: string;
    /* Optional styled version shown in place of `caption`, e.g. a link. */
    captionContent?: ReactNode;
  }[];
};

const ne = (text: string) => (
  <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
    {text}
  </span>
);

/* Devanagari over the romanised name. The Gregorian span it maps onto lives in
   the prose rather than the heading. */
const month = (nepali: string, roman: string) => (
  <>
    {ne(nepali)}
    <span
      style={{
        display: "block",
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-marigold)",
        marginTop: "0.4rem",
      }}
    >
      {roman}
    </span>
  </>
);

/* Reading elsewhere, opened in its own tab so nobody loses their place here. */
const out = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "var(--color-marigold)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    }}
  >
    {text}
  </a>
);

const MOOL_GHAR: BlogPost = {
  slug: "mool-ghar",
  tag: "Origin Story",
  title: "Mool Ghar",
  devanagari: "मूल घर",
  date: "Jul 30, 2026",
  readTime: "4 min read",
  music: {
    youtube: "0fYbkFKJmO0",
    backdrop: musicRosePuja,
    title: "“Ganashpati”",
    artist: "Kuma Sagar",
    hideArtist: true,
    note: "The right soundtrack for Mool Ghar.",
  },
  intro: [
    <>
      Mool means root. Ghar means home. Put them together and every dictionary
      will hand you <em>ancestral house</em>, which is technically correct and
      almost entirely ancient. A mool ghar is not the chhen — not the brick and
      the timber of it. It is the address your family's rituals are registered
      to: the one house where the gods are kept, where the feasts happen, and
      where you go back to be married, initiated, mourned and fed.
    </>,
    <>
      So let me give you the tour, starting outside the front door, because in a
      mool ghar the house begins before you are in it.
    </>,
  ],
  introVideo: {
    src: patanAerialVideo,
    poster: patanAerialPoster,
    alt: "Aerial footage drifting over the temple roofs of Patan Durbar Square",
  },
  sections: [
    {
      heading: (
        <>
          We call it{" "}
          {out(
            "https://heritageasplacemaking.com/urban-heritage-mining-blog/pikha-lakhu-by-madina-rai",
            "Pikha Lakhu",
          )}
        </>
      ),
      image: {
        src: gharPikhaLakhu,
        alt: "A puja laid out on the floor: a brass deity, marigolds, rice and a copper plate with a banana and an oil lamp",
        caption: "what gets handed over at the door",
        position: "center 40%",
      },
      paragraphs: [
        <>
          Right at the threshold of the main door sits a small mandala of stone
          or brass, set into the ground: the Pikha Lakhu. It is easy to walk
          straight over if nobody has told you it is there, and people do, and
          then somebody's grandmother has opinions.
        </>,
        <>
          The Pikha Lakhu marks the spiritual boundary of the household — the
          line between the family's inside and everybody else's outside. It is
          worshipped every morning by the matriarch of the house, and it is
          where a great deal of ritual gets handed over: what comes in, what is
          sent out, what is not allowed past the door.
        </>,
        <>A doorstep with a job!</>,
      ],
    },
    {
      heading: "Call it courtyard, chowk, bahal",
      image: {
        src: gharChowk,
        alt: "A quiet square in Patan with a two-tiered pagoda temple among red brick houses",
        caption: "everyone’s business, on a quiet morning",
        position: "center 45%",
      },
      paragraphs: [
        <>
          The{" "}
          {out("https://ecs.com.np/features/a-newari-house-reborn", "chhen")} is
          red brick and intricately carved wood, but its defining
          feature is that it turns inward. A mool ghar gathers around a chowk,
          or bahal in older quarters, making the courtyard the house’s actual
          room.
        </>,
        <>
          Community feasts happen there. Family feasts happen there. Rituals
          that need fifty people and four hours happen there. It is also where
          everyone can see exactly who arrived, with whom, and how late, which
          is either the charm or the problem depending on the decade you were
          born in.
        </>,
      ],
    },
    {
      heading: "The forbidden room: Agam Chhen",
      image: {
        src: gharMoolGhar,
        alt: "A diyo burning on the floor among marigold petals and sindoor",
        caption: "as close to the agam chhen as a camera gets",
      },
      paragraphs: [
        <>
          Here is the part that makes a mool ghar a mool ghar rather than a
          handsome old chhen: it houses the family's lineage shrines. The{" "}
          {ne("मूल घर")} is where the Agam Chhen is — a highly restricted
          private room, usually on the upper floors, dedicated to the family's
          esoteric deities, the Agam Dyah.
        </>,
        <>
          Only initiated family members go in. Not guests, not the uninitiated,
          not you, and depending on the house, not me either. The deity stays.
          The house stays with the deity. That is the whole arrangement, and it
          is the reason the chhen cannot simply be sold and swapped for
          something with better plumbing.
        </>,
        <>
          It is also a tradition on the way out. Not gone — not close to gone —
          but slipping, because the restrictions that kept it intact are the
          same restrictions that make it hard to keep up. A generation raised
          half in the west, families spread across four cities, and rules that
          are… well. Now <em>that</em> is something I am saving for 2 cents ;)
        </>,
      ],
    },
    {
      heading: "Born as a son or daughter",
      image: {
        src: gharHimalHome,
        alt: "A hand holding three lit diyos over a puja plate in Himal Home, Patan",
        caption: "same house, same lamps, different rules",
        position: "center 45%",
      },
      paragraphs: [
        <>
          Zoom out from the architecture and the same house organises people. If
          you are born a son, you get{" "}
          {out(
            "https://intravelmag.com/intravel/indigenous/hindu-bratabandha-ceremony-nepal",
            "bartabandha",
          )}{" "}
          — the initiation that makes
          you a full member of the lineage, with all the access that comes with
          it.
        </>,
        <>
          If you are born a daughter, you get three husbands. Relax. Sit down.
          Let me explain.
        </>,
      ],
    },
    {
      heading: "Husband one: an apple, divine one",
      image: {
        src: gharIhi,
        alt: "A small girl in her Ihi finery and red bangles, held close by a man in glasses",
        caption: "Ihi day: married to a bel, no regrets",
        position: "center 35%",
      },
      paragraphs: [
        <>
          The first marriage is{" "}
          {out(
            "https://www.sbs.com.au/language/nepali/en/article/the-story-of-ihi-why-girls-from-this-community-are-marrying-a-fruit/32lwcaa4e",
            "Ihi",
          )}
          , and the groom is a bel fruit — wood apple —
          which is a form of Vishnu. It is celebrated exactly like a wedding —
          not the desi kind with the bling, but the kind with ritual, procedure,
          a great deal of red, and genuinely excellent food.
        </>,
        <>
          A small girl, dressed as a bride, married to a god in fruit form, in
          the courtyard, surrounded by the entire extended family. It is as
          wholesome as it sounds and the photographs are unbeatable.
        </>,
      ],
    },
    {
      heading: "Husband two: the Sun",
      image: {
        src: gharBahra,
        alt: "A smiling girl in red and gold with a peacock feather in her hair, standing with a man in an argyle sweater",
        caption: "day twelve, out in the sun at last",
        position: "center 45%",
      },
      paragraphs: [
        <>
          The second is{" "}
          {out(
            "https://steemit.com/wedding/@elishagautam/marriage-with-the-sun-an-important-tradition",
            "Bahra Tayegu",
          )}
          , and the groom is the sun god.
        </>,
        <>
          For twelve days, no sunlight reaches her and no male sets eyes on her —
          not her brother, not her dad. Only female company; playing with
          makeup, passing the hours with{" "}
          {out("https://www.youtube.com/watch?v=LLH4vi8uupg", "gatti")}, filling
          the room with their own energy. On the twelfth day the ritual
          concludes: she is brought out, and the first thing she is presented
          to, and the thing she is married to, is the sun.
        </>,
        <>
          Which brings us to the why behind it all. The most compelling
          explanation? These marriages were a kind of safety net, a cosmic
          cushion against widowhood. If your first husband is a form of God and
          your second is the sun itself, then no mortal man dying can ever
          leave you a widow. Her real husbands are immortal. The human one is
          technically the runner-up.
        </>,
      ],
    },
    {
      heading: "So why all of this?",
      image: {
        src: moodLinenAnklets,
        alt: "Anklets over linen, feet off the ground",
        caption: "body, mind and spirit, all under one roof",
      },
      paragraphs: [
        <>
          So why does a community marry its daughters to fruit and to the sun,
          keep a room upstairs that most of the family never enters, and worship
          a doorstep every single morning? Strip the ritual back and the answer
          is mostly the same: care. Each of these rites turns up at the exact
          moment a person is changing, and makes sure they are not left to do
          it alone.
        </>,
        <>
          Some of it looks after the body: Bahra shows up right as a girl is
          growing up, and hands her twelve days of rest, feasting, and being
          waited on hand and foot. Some
          of it looks after the mind: Ihi and bartabandha tell a child, in front
          of fifty relatives, that they belong — to a house, a lineage, a
          courtyard that will always have a plate for them. And some of it
          looks after the spirit: a god in the family, a doorstep that keeps
          the wrong things out, a shrine upstairs that never moves.
        </>,
        <>
          Call it superstition if you like. I call it the most thorough
          insurance policy ever written, and the mool ghar is where it is kept.
        </>,
      ],
    },
  ],
  outro: [
    <>
      These are all facts, beliefs, and for some people, reality to a
      considerable extent. This is a magnifying lens held over the thing, not a
      verdict on it. My verdict, if I ever formulate one, goes in 2 cents.
    </>,
    <>
      And because a tour is nothing without the family album: below is April
      1998, a courtyard dressed in red for the wedding and my sisters lined up
      in all their tiny, serious bride glory. They got the
      bel, the feast and the fuss; I got to put it on the internet. Sorry{" "}
      {ne("दिदिहरु")} but hover around for the gossip!
    </>,
  ],
  /* Family photos from the Ihi and Bahra, 1998. */
  moodBoardLayout: "square",
  moodBoardTitle: "Moodboard for MoolGhar",
  moodBoardCarousel: true,
  moodBoard: [
    {
      image: moolGharMood01,
      alt: "Children in paper caps lined up in a garden with a man behind them, a pile of bricks beside",
      caption: "first marriage of my sisters, 1998",
    },
    {
      image: moolGharMood02,
      alt: "Girls seated in a row on a mat in a courtyard, offering pots and a fire pit in front of them",
      caption: "front row for the Bel drop",
    },
    {
      image: moolGharMood03,
      alt: "Women passing white thread around a group of small girls beside a clay pot",
      caption: "round & round she goes: ONZ edition",
    },
    {
      image: moolGharMood04,
      alt: "Girls in red and white eating from plates of beaten rice and curry on the stone floor",
      caption: "excellent food, as promised",
    },
    {
      image: moolGharMood05,
      alt: "A woman draping thread over a line of girls while family watch from a brick doorway",
      caption: "round & round again: ANZ edition",
    },
    {
      image: moolGharMood06,
      alt: "A woman crouched before small girls in red and gold while women stand watching",
      caption: "Alah time",
      captionContent: out(
        "https://nenepal.com/blogs/cultural-guides/the-disappearing-practice-of-alah",
        "Alah time",
      ),
    },
    {
      image: moolGharMood07,
      alt: "A man in white holding a cloth while girls sit on a mat behind him",
      caption: "rites, rituals & procedure it is",
    },
    {
      image: moolGharMood08,
      alt: "A crowded courtyard of girls in red and gold holding plates among family",
      caption: "fifty people and five hours, roughly",
    },
    {
      image: moolGharMood09,
      alt: "An elder in white with a small girl on his lap, family and children around a puja plate",
      caption: "best seat in the house: a lap",
    },
    {
      image: moolGharMood10,
      alt: "Girls in red sitting in a row beside fruit, pots and a square fire pit",
      caption: "bel fruit: the original long-term boyfriend",
    },
    {
      image: moolGharMood11,
      alt: "Four girls in gold and red silk holding leaf plates in a lane",
      caption: "four brides, zero grooms, all attitude",
    },
    {
      image: moolGharMood12,
      alt: "Two girls with yellow headbands seated while women tend to them indoors",
      caption: "second marriage, forever together sisters",
    },
    {
      image: moolGharMood13,
      alt: "A woman washing the hands of two girls in yellow headbands over a bowl",
      caption: "mum and her two beautiful brides",
    },
    {
      image: moolGharMood14,
      alt: "Three children in silk and paper caps sitting on a step with bowls",
      caption: "married by noon, snacking by one",
    },
    {
      image: moolGharMood15,
      alt: "A woman crouching before a line of girls in a sunny courtyard with a clay pot",
      caption: "courtyard having its main-character day",
    },
  ],
};

const FESTIVAL_CALENDAR: BlogPost = {
  slug: "festival-calendar",
  tag: "Festivals",
  /* Reads as one line on the page: the Nepali carries the comma so the title
     matches the card it opens from. */
  title: "by Bikram Sambat",
  devanagari: "बाह्र महिना,",
  date: "Jul 10, 2026",
  readTime: "6 min read",
  music: {
    youtube: "A0GOxBvHNNg",
    backdrop: moodPujaMarigold,
    title: "“Man Magan”",
    artist: "Deepak Bajracharya",
    hideArtist: true,
    note: "The right soundtrack for a year this full.",
  },
  intro: [
    <>
      Nepal keeps its own year. Bikram Sambat runs roughly 57 years ahead of the
      Gregorian calendar — 2083 here while the rest of the world writes 2026 —
      and it turns over in the middle of April rather than on a cold night in
      December. Twelve months, Baisakh through Chaitra, lunar in the parts that
      matter.
    </>,
    <>
      What makes it useful is that the months are not neutral. Each one arrives
      with its own weather and its own festivals, and those are the same piece
      of information: the rain, the planting, the harvest, the cold, the first
      clear sky after the monsoon. The calendar doubles as the forecast. It
      tells you when to plant, when to feast, and when the mountains will be
      out.
    </>,
  ],
  sections: [
    {
      heading: month("बैशाख", "Baisakh"),
      image: {
        src: gharChowk,
        alt: "A two-tiered pagoda temple in a quiet Patan square, red brick houses around it",
        caption: "Patan, clearing a path for the chariot",
        position: "center 45%",
      },
      paragraphs: [
        <>
          The year turns over here, mid-April into mid-May, on Baisakh 1. Bisket
          Jatra has already started in Bhaktapur — it runs from the last days
          of Chaitra across the new year — chariots hauled through the
          streets, a pole raised and brought down, and a crowd that decides how
          it goes. Mata Tirtha Aunsi is Mother&rsquo;s Day by the Bikram
          Sambat calendar, and Rato Machhindranath&rsquo;s chariot begins its
          slow crawl through Patan.
        </>,
        <>
          The month is crowded with birthdays: Parshuram Jayanti, Sita Jayanti,
          and Buddha Jayanti on the full moon. Akshaya Tritiya marks the day
          Shiva and Parvati were married. Warm days, rhododendron up in the
          hills, and the haze not yet thick enough to hide the mountains.
        </>,
      ],
    },
    {
      heading: month("जेठ", "Jestha"),
      image: {
        src: gharGosaikunda,
        alt: "Sitting on a rock at the edge of a still alpine lake in the mountains",
        caption: "Gosaikunda, worth every step up",
        position: "center 50%",
      },
      paragraphs: [
        <>
          Mid-May into mid-June: hot, heavy, and visibly waiting for rain. The
          valley is at its least comfortable, so the month belongs to the
          hills. Gosaikunda is the walk: around nine days there and back, up to
          a lake at 4,380m that Shiva is said to have struck open with his
          trishul to cool the poison in his throat — the poison that turned it
          blue and made him Nilkantha.
        </>,
      ],
    },
    {
      heading: month("असार", "Ashad"),
      image: {
        src: lakeWater,
        alt: "Bare feet over the bow of a blue wooden boat on lake water",
        caption: "monsoon water, feet first",
        position: "center 55%",
      },
      paragraphs: [
        <>
          The monsoon lands, mid-June into mid-July. Rato Machhindranath
          finishes with Bhoto Jatra, the god&rsquo;s jewelled vest held up to
          the crowd in Jawalakhel. Asar 15 is dahi chiura khane din, the big
          day for farmers: rice planting, knee-deep mud, singing, and
          dahi-chiura eaten sitting in the field. Call it a mud fest with a
          harvest at the end of it.
        </>,
        <>
          Gorakhkali puja is held in Gorkha and at Pashupatinath, and
          Bhanubhakta Jayanti remembers the poet who put the Ramayana into
          Nepali. The trails turn to cloud and leeches, and the valley goes a
          green it does not manage any other month of the year.
        </>,
      ],
    },
    {
      heading: month("साउन", "Shrawan"),
      image: {
        src: gharPatanAerial,
        alt: "Patan Durbar Square from above under a heavy grey sky",
        caption: "a sky that keeps on giving",
        position: "center 40%",
      },
      paragraphs: [
        <>
          Mid-July into mid-August is full rain, and Shiva&rsquo;s month: green
          bangles, green saris, Mondays at Pashupatinath. Shrawan Sankranti is
          the cultural clock — from here the chadbad, the festival season,
          officially starts counting down.
        </>,
        <>
          Tulsi gets planted in the courtyard on tulsi ropne din, Teacher&rsquo;s
          Day thanks the gurus, and Shrawan 15 is kheer khane din: rice pudding,
          warm, for everyone, and nobody asks why.
        </>,
      ],
    },
    {
      heading: month("भदौ", "Bhadra"),
      image: {
        src: moodNewarTattoo,
        alt: "Traditional Newar leg tattoos of a temple window and peacocks",
        caption: "jatra season, worn on the skin",
        position: "center 40%",
      },
      paragraphs: [
        <>
          Mid-August into mid-September. The rain thins out and the festivals
          stack up. Naag Panchami pastes the serpent gods above every door.
          Janai Purnima renews the sacred thread, sends thousands up to
          Gosaikunda, and is kwati khane din — nine different beans in one
          soup. Matayā follows in Patan: every Buddhist shrine in the city
          touched in a single day, on foot, which is a triathlon if anyone is
          honest about it.
        </>,
        <>
          Then Gai Jatra: cows, costumes, satire, and the year&rsquo;s dead
          remembered by being laughed at. Krishna Janmashtami, Teej, and
          Paigambar Jayanti for the Prophet&rsquo;s birthday. And now the
          month holds the Gen Z shahid too, the young people killed in the
          protests of 2082, remembered in the same weeks as everyone else the
          city mourns.
        </>,
      ],
    },
    {
      heading: month("असोज", "Ashwin"),
      image: {
        src: moodPujaMarigold,
        alt: "Marigolds, diyo, sindoor and incense laid out on brick for puja",
        caption: "marigolds on everything, starting here",
        position: "center 70%",
      },
      paragraphs: [
        <>
          Mid-September into mid-October, and the sky empties. Biswakarma Puja
          comes first: tools, machines, cars and laptops get tika and a
          marigold, because anything that works for you deserves thanks. Indra
          Jatra takes Kathmandu Durbar Square, the Kumari&rsquo;s chariot out
          and the Lakhey clearing the street ahead of it. Father&rsquo;s Day by
          the Bikram Sambat calendar falls here too.
        </>,
        <>
          It is the last real heat before winter and the week the trekking
          season opens. The air does not get clearer than this.
        </>,
      ],
    },
    {
      heading: month("कार्तिक", "Kartik"),
      image: {
        src: gharHimalHome,
        alt: "A hand holding three lit diyos over a puja plate",
        caption: "oil lamps, five nights running",
        position: "center 45%",
      },
      paragraphs: [
        <>
          Mid-October into mid-November is the big one. Dashain first, which is
          Christmas and then some — new clothes, tika and jamara, the largest
          feast of the year and the best Newari food in it, kites in the air,
          markets that do not sleep, marigolds on everything.
        </>,
        <>
          Then Tihar, five days of thanking everything that is alive, ourselves
          included: kaag puja for the crow, kukur puja for the dog, gai and
          Laxmi puja, mha puja for your own body, bhai tika for the siblings.
          Oil lamps down every street. Kartik Nach fills Patan Durbar Square
          with masked dance-drama, the way it has for centuries.
        </>,
        <>
          Dashain and Tihar sit about two weeks apart, which is exactly the
          length of a proper trek. Peak season, and the reason the lodges are
          booked a year out.
        </>,
      ],
    },
    {
      heading: month("मंसिर", "Mangsir"),
      image: {
        src: gharTrekking,
        alt: "Hooded, buffed and sunglassed on a cold pass, snowed-on peaks behind",
        caption: "cold, dry and dressed for it",
        position: "center 30%",
      },
      paragraphs: [
        <>
          Mid-November into mid-December. Cold, dry, and the mountains at their
          sharpest all year. Wedding season starts, so a procession is likely
          wherever you happen to be standing. Bibaha Panchami re-enacts Ram and
          Sita&rsquo;s wedding, and Janakpur throws it like the real thing.
          Bala Chaturdashi brings the night-long walk through Pashupatinath.
        </>,
      ],
    },
    {
      heading: month("पुष", "Poush"),
      image: {
        src: basecamp,
        alt: "Arms out on a rocky trail below snow-covered Himalayan peaks",
        caption: "high is cold, empty and enormous",
        position: "center 45%",
      },
      paragraphs: [
        <>
          Mid-December into mid-January: the valley fogs in and the sun does not
          properly show up until ten. Yomari Punhi on the full moon — steamed
          dumplings shaped like figs, chaku and sesame inside, eaten hot. Tamu
          Lhosar for the Gurung new year, and Prithvi Jayanti for the king who
          pulled the country together.
        </>,
        <>
          Coldest, quietest month. The country sorts itself by altitude: low is
          Chitwan, Pokhara and the Terai, high is cold, empty trails and
          enormous views.
        </>,
      ],
    },
    {
      heading: month("माघ", "Magh"),
      image: {
        src: gharPujaThali,
        alt: "A puja thali of flowers, banana and sindoor beside a hand holding a rose",
        caption: "a fresh start, offered with both hands",
        position: "center 40%",
      },
      paragraphs: [
        <>
          Mid-January into mid-February, and Maghe Sankranti on day one — til ko
          laddu, chaku, ghee, sweet potato, and official notice that the sun is
          on its way back. Sonam Lhosar for the Tamang new year. All month,
          households read the Swasthani Katha aloud, a chapter a day, the
          stories of Shiva and Parvati passed down at bedtime.
        </>,
        <>
          Shree Panchami hands the month to Saraswati, which makes it the day
          to begin anything you intend to be good at.
        </>,
      ],
    },
    {
      heading: month("फागुन", "Falgun"),
      image: {
        src: gharMoolGhar,
        alt: "A diyo burning on the floor among marigold petals and sindoor",
        caption: "Shivaratri: nobody sleeps",
        position: "center 50%",
      },
      paragraphs: [
        <>
          Mid-February into mid-March, and Maha Shivaratri first: Pashupatinath
          at its absolute fullest, sadhus, fires, nobody sleeping, and the
          crowd come for chhaya darshan at the temple. Gyalpo Lhosar for the
          Sherpa and Tibetan new year. Spring turns up somewhere in the middle
          of it.
        </>,
      ],
    },
    {
      heading: month("चैत", "Chaitra"),
      image: {
        src: gharFacade,
        alt: "Standing under the carved timber arcade of a red brick Newar building",
        caption: "warm again, and round it goes",
        position: "center 60%",
      },
      paragraphs: [
        <>
          Mid-March into mid-April, and warm again. Holi says out loud what the
          weather has been hinting for a fortnight — winter is finished — and
          the entire city is complicit. Ghode Jatra runs the horses across
          Tundikhel, and Ram Navami brings Ram&rsquo;s birthday.
        </>,
        <>
          Rhododendron opens up in the hills and the second trekking season
          starts. Bisket Jatra begins in Bhaktapur in the last days of the
          month, the year turns over into Baisakh, and does all of it again.
        </>,
      ],
    },
  ],
  outro: [
    <>
      Read it as a forecast and it answers like one. Historic and dry: Kartik
      into Mangsir, when the durbar squares, Pashupatinath, Nagarkot and
      Dhulikhel all sit in clear air, and Muktinath is reachable if the days
      allow. Devotion at altitude: Gosaikunda in Jestha. Wet, green and useless
      in the best way: Asar, planting rice badly.
    </>,
    <>
      We are, admittedly, a deeply religious people. We also have a calendar
      that says when the rain is coming, when to plant, when to stop and eat,
      and when the sky will be clear enough to see Everest. Call it religion,
      call it scheduling. It works.
    </>,
    <>
      And because a calendar reads better with pictures: below is the year,
      Baisakh to Chaitra, one frame a month. Hover for the gossip.
    </>,
  ],
  /* The year in twelve frames, one per month, Baisakh to Chaitra. */
  moodBoardLayout: "square",
  moodBoardTitle: "Moodboard for Bikram Sambat",
  moodBoardColumns: 6,
  moodBoard: [
    {
      image: gharChowk,
      alt: "A pagoda temple in a quiet Patan square",
      caption: "Baisakh: the year turns over in a square like this",
    },
    {
      image: gharGosaikunda,
      alt: "Sitting at the edge of a still alpine lake in the mountains",
      caption: "Jestha: nine days up to Nilkantha's lake",
    },
    {
      image: lakeWater,
      alt: "Bare feet over the bow of a blue wooden boat on lake water",
      caption: "Ashad: the monsoon lands, everything gets wet",
    },
    {
      image: gharPatanAerial,
      alt: "Patan Durbar Square from above under a heavy grey sky",
      caption: "Shrawan: kheer, tulsi, and the chadbad clock starts",
    },
    {
      image: gharPikhaLakhu,
      alt: "A puja laid out on the floor: a brass deity, marigolds, rice and a copper plate",
      caption: "Bhadra: jatras stacked back to back",
    },
    {
      image: moodPujaMarigold,
      alt: "Marigolds, diyo, sindoor and incense laid out on brick",
      caption: "Ashwin: Biswakarma, Indra Jatra, the sky clears",
    },
    {
      image: gharDashain,
      alt: "A dog on a balcony wearing tika and a marigold garland",
      caption: "Kartik: Dashain, then Tihar. kukur puja, he outranks us",
    },
    {
      image: gharTrekking,
      alt: "Hooded and sunglassed on a cold pass, peaks behind",
      caption: "Mangsir: the mountains at their sharpest",
    },
    {
      image: basecamp,
      alt: "Arms out on a rocky trail below snowy Himalayan peaks",
      caption: "Poush: high, cold, empty, enormous",
    },
    {
      image: gharPujaThali,
      alt: "A puja thali of flowers and banana beside a hand holding a rose",
      caption: "Magh: Swasthani Katha, a chapter a night",
    },
    {
      image: gharMoolGhar,
      alt: "A diyo burning on the floor among marigold petals",
      caption: "Falgun: Shivaratri fires, nobody sleeps",
    },
    {
      image: gharFacade,
      alt: "Standing under the carved arcade of a red brick Newar building",
      caption: "Chaitra: Holi, horses, and round it goes",
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [MOOL_GHAR, FESTIVAL_CALENDAR];

export const getPost = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug);
