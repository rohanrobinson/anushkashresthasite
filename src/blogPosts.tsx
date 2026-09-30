import type { ReactNode } from "react";

import gharMoolGhar from "./assets/ghar/mool-ghar-diyo.jpg";
import gharPujaThali from "./assets/ghar/puja-thali-rose.jpg";
import gharPatanAerial from "./assets/ghar/mangal-bazar-patan.jpg";
import moodPujaMarigold from "./assets/mood/02-puja-marigold.jpg";
import moodNewarTattoo from "./assets/mood/01-newar-tattoo.jpg";
import gharDashain from "./assets/ghar/dashain-tika-dog.jpg";
import gharGosaikunda from "./assets/ghar/rasuwa-gosaikunda.jpg";
import gharTrekking from "./assets/ghar/trekking-pass.jpg";

export type BlogSection = {
  heading: ReactNode;
  paragraphs: ReactNode[];
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
  /* The record to put on while you read. `spotify` is the track id the embed
     player is built from. */
  music: {
    spotify: string;
    title: string;
    artist: string;
    note: string;
  };
  intro: ReactNode[];
  sections: BlogSection[];
  outro: ReactNode[];
  moodBoard: {
    image: string;
    alt: string;
    caption: string;
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
    spotify: "1CDZekYBi52KRJ8WoBlvXw",
    title: "Ganashpati",
    artist: "Kuma Sagar",
    note: "press play. it is the correct soundtrack for a house like this.",
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
          sent out, what is not allowed past the door. A doorstep with a job.
        </>,
      ],
    },
    {
      heading: "Call it courtyard, chowk, bahal and everyone's business",
      paragraphs: [
        <>
          The chhen itself is traditional red brick with wooden windows carved
          to a degree that makes no structural sense and total cultural sense.
          But the part that matters is that it faces inward. A mool ghar
          typically opens onto an inner courtyard — a chowk, or in the older
          quarters a bahal — and that courtyard is the actual room of the house.
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
      heading: "It's called the forbidden room: Agam Chhen",
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
      paragraphs: [
        <>
          Zoom out from the architecture and the same house organises people. If
          you are born a son, you get bartabandha — the initiation that makes
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
      paragraphs: [
        <>
          The first marriage is Ihi, and the groom is a bel fruit — wood apple —
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
      paragraphs: [
        <>
          The second is Bahra Tayegu, and the groom is the sun god. Not Jesus,
          dummy. Although — who knows, who's checking.
        </>,
        <>
          The girl is kept in a room away from direct sunlight and away from men
          for twelve days. On the twelfth day the ritual concludes: she is
          brought out, and the first thing she is presented to, and the thing
          she is married to, is the sun.
        </>,
        <>
          Which brings us to why any of this exists. The going explanation is
          that these marriages were built as insurance against sati and against
          widowhood — if a woman's first husband is a fruit that is a god, and
          her second is the sun itself, then no human husband dying can ever
          make her a widow. Her real husbands are immortal. The third one, the
          human one, is technically the runner-up.
        </>,
      ],
    },
    {
      heading: "Living goddess: Kumari",
      paragraphs: [
        <>
          At the far end of the same logic sits the Kumari: the living goddess.
          A young girl, selected from a Newar lineage, who is worshipped as the
          goddess in a body while she lives in her house in the square, is
          carried out for festivals, and gives darshan from a carved window that
          people queue below.
        </>,
        <>
          She holds the role until she reaches puberty, and then the goddess
          moves on to the next girl and she goes back to being a person. Same
          city, same brick, same carved wood as the mool ghar — a whole system
          built on the idea that the divine keeps an address here, and it is
          usually somebody's daughter or somebody's upstairs room.
        </>,
      ],
    },
  ],
  outro: [
    <>
      These are all facts, beliefs, and for some people, reality to a
      considerable extent. This is a magnifying lens held over the thing, not a
      verdict on it.
    </>,
    <>The verdict, if I ever get around to one, goes in 2 cents.</>,
  ],
  moodBoard: [
    {
      image: gharMoolGhar,
      alt: "A diyo burning on the floor among marigold petals and sindoor",
      caption: "the floor is the altar and always was",
    },
    {
      image: gharPujaThali,
      alt: "A puja thali of flowers, banana and sindoor beside a hand in red bangles holding a rose",
      caption: "thali, bangles, one rose doing overtime",
    },
    {
      image: moodPujaMarigold,
      alt: "Marigolds, diyo, sindoor and incense laid out on brick for puja",
      caption: "supply run, spiritual, restocked weekly",
    },
    {
      image: gharPatanAerial,
      alt: "Patan Durbar Square from above: Krishna Mandir, pagoda roofs and the crowded square",
      caption: "the neighbourhood, from somebody's roof",
    },
    {
      image: moodNewarTattoo,
      alt: "Traditional leg tattoo of a temple façade and peacocks",
      caption: "the architecture, worn permanently",
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
  readTime: "4 min read",
  music: {
    spotify: "3XavmNx1VD3nLg0qmWNRtf",
    title: "Man Magan",
    artist: "Deepak Bajracharya",
    note: "press play. The Right Sound for a Calendar Steeped in Culture.",
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
    <>
      The first month is Baisakh, and it lands mid-April into mid-May — so on a
      2026 calendar the new year falls in the middle of April, not in January.
      It is the tail of the dry season: warm days, cool nights, and the
      pre-monsoon storms only just starting to turn up in the evenings.
      Everything after it runs largely on the moon, so the dates drift a couple
      of weeks year to year. The season holds, the day does not. Here is the
      year in order.
    </>,
  ],
  sections: [
    {
      heading: month("बैशाख", "Baisakh"),
      paragraphs: [
        <>
          The year turns over here, mid-April into mid-May. Bisket Jatra takes
          Bhaktapur — chariots hauled through the streets, a pole raised and
          brought down, and a crowd that decides how it goes. Warm days,
          rhododendron up in the hills, and the haze not yet thick enough to
          hide the mountains. Rato Machhindranath's chariot begins its slow
          crawl through Patan.
        </>,
      ],
    },
    {
      heading: month("जेठ", "Jestha"),
      paragraphs: [
        <>
          Mid-May into mid-June: hot, heavy, and visibly waiting for rain. Rato
          Machhindranath finishes with Bhoto Jatra, and Sithi Nakha sends the
          Newar neighbourhoods down into the wells and ponds to clean them
          before the monsoon fills them again. The valley is at its least
          comfortable; the month belongs to the hills.
        </>,
      ],
    },
    {
      heading: month("असार", "Ashad"),
      paragraphs: [
        <>
          The monsoon lands, mid-June into mid-July. Asar 15 is Ropain — rice
          planting, knee-deep mud, singing, dahi-chiura eaten sitting in the
          field. The trails turn to cloud and leeches. The valley goes a green
          it does not manage any other month of the year.
        </>,
      ],
    },
    {
      heading: month("साउन", "Shrawan"),
      paragraphs: [
        <>
          Mid-July into mid-August is full rain, and Shiva's month: green
          bangles, green saris, Mondays at Pashupatinath. It closes on Janai
          Purnima, which is when Gosaikunda fills up — a lake at 4,380m, a hard
          walk to reach it, and thousands of people going up regardless. Kwati
          the same day, nine different beans in one soup.
        </>,
      ],
    },
    {
      heading: month("भदौ", "Bhadra"),
      paragraphs: [
        <>
          Mid-August into mid-September. The rain thins out and the jatras stack
          up. Gai Jatra: cows, costumes, satire, and the year's dead remembered
          by being laughed at. Matayā follows in Patan — every Buddhist shrine
          in the city touched in a single day, on foot, which is a triathlon if
          anyone is honest about it. Then Teej, Krishna Janmashtami and Indra
          Jatra, the Kumari's chariot out and the Lakhey clearing the street
          ahead of it.
        </>,
      ],
    },
    {
      heading: month("असोज", "Ashwin"),
      paragraphs: [
        <>
          Mid-September into mid-October: the sky empties and Dashain arrives,
          which is Christmas and then some — new clothes, tika and jamara, the
          largest feast of the year and the best Newari food in it, kites in the
          air, markets that do not sleep, marigolds on everything. It is also
          the last real heat before winter and the week the trekking season
          opens. The air does not get clearer than this.
        </>,
      ],
    },
    {
      heading: month("कार्तिक", "Kartik"),
      paragraphs: [
        <>
          Mid-October into mid-November brings Tihar, five days of thanking
          everything that is alive, ourselves included: kaag puja for the crow,
          kukur puja for the dog, gai and Laxmi puja, mha puja for your own
          body, bhai tika for the siblings. Oil lamps down every street. Vishnu
          wakes at Haribodhini Ekadashi, and Budhanilkantha takes the crowd for
          it.
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
      paragraphs: [
        <>
          Mid-November into mid-December. Cold, dry, and the mountains at their
          sharpest all year. Wedding season, so a procession is likely wherever
          you happen to be standing. Yomari Punhi on the full moon — steamed
          dumplings shaped like figs, chaku and sesame inside, eaten hot. Bala
          Chaturdashi brings the night-long walk through Pashupatinath.
        </>,
      ],
    },
    {
      heading: month("पुष", "Poush"),
      paragraphs: [
        <>
          Mid-December into mid-January: the valley fogs in and the sun does not
          properly show up until ten. Coldest, quietest month, and Tamu Lhosar
          for the Gurung new year. The country sorts itself by altitude: low is
          Chitwan, Pokhara and the Terai, high is cold, empty trails and
          enormous views.
        </>,
      ],
    },
    {
      heading: month("माघ", "Magh"),
      paragraphs: [
        <>
          Mid-January into mid-February, and Maghe Sankranti on day one — til ko
          laddu, chaku, ghee, sweet potato, and official notice that the sun is
          on its way back. Sonam Lhosar for the Tamang new year. Shree Panchami
          hands the month to Saraswati, which makes it the day to begin anything
          you intend to be good at.
        </>,
      ],
    },
    {
      heading: month("फागुन", "Falgun"),
      paragraphs: [
        <>
          Mid-February into mid-March, and Maha Shivaratri first: Pashupatinath
          at its absolute fullest, sadhus, fires, nobody sleeping. Then Holi
          says out loud what the weather has been hinting for a fortnight —
          winter is finished — and the entire city is complicit. Gyalpo Lhosar
          as well. Spring turns up somewhere in the middle of it.
        </>,
      ],
    },
    {
      heading: month("चैत", "Chaitra"),
      paragraphs: [
        <>
          Mid-March into mid-April, and warm again. Ghode Jatra runs the horses
          across Tundikhel, Seto Machhindranath goes through Kathmandu, and
          Chaite Dashain passes quietly. Rhododendron opens up in the hills and
          the second trekking season starts. Then the year turns over into
          Baisakh and does all of it again.
        </>,
      ],
    },
  ],
  outro: [
    <>
      Read it as a forecast and it answers like one. Historic and dry: Kartik
      into Mangsir, when the durbar squares, Pashupatinath, Nagarkot and
      Dhulikhel all sit in clear air, and Muktinath is reachable if the days
      allow. Devotion at altitude: Gosaikunda in Shrawan. Wet, green and useless
      in the best way: Asar, planting rice badly.
    </>,
    <>
      We are, admittedly, a deeply religious people. We also have a calendar
      that says when the rain is coming, when to plant, when to stop and eat,
      and when the sky will be clear enough to see Everest. Call it religion,
      call it scheduling. It works.
    </>,
  ],
  moodBoard: [
    {
      image: moodPujaMarigold,
      alt: "Marigolds, diyo, sindoor and incense laid out on brick for puja",
      caption: "marigold season, the markets know first",
    },
    {
      image: gharDashain,
      alt: "A dog on a Kathmandu balcony wearing tika and a marigold garland",
      caption: "kukur puja. one day a year he outranks us",
    },
    {
      image: gharGosaikunda,
      alt: "Sitting on a rock at the edge of a still alpine lake in the mountains",
      caption: "Gosaikunda, and everyone who walked up for it",
    },
    {
      image: gharTrekking,
      alt: "Hooded, buffed and sunglassed on a cold pass, snowed-on peaks behind",
      caption: "Kartik air, the reason people book a year out",
    },
    {
      image: gharPatanAerial,
      alt: "Patan Durbar Square from above: Krishna Mandir, pagoda roofs and the crowded square",
      caption: "Patan, between one jatra and the next",
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [MOOL_GHAR, FESTIVAL_CALENDAR];

export const getPost = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug);
