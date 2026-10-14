import { useState, useEffect, useRef, type ReactNode } from "react"

import BlogPage from "./BlogPage"
import { getPost } from "./blogPosts"

import heroVideo from "./assets/hero/painting.mp4"
import heroPoster from "./assets/hero/painting.jpg"
import socialsBackdrop from "./assets/footer-media/basecamp-2021.jpg"
import MoodReel from "./MoodReel"
import useIsPhone from "./useIsPhone"
import moodLakefrontSkyline from "./assets/mood/31-lakefront-skyline.jpg"
import moodNightRose from "./assets/mood/21-night-rose.jpg"
import moodJetskiSunset from "./assets/mood/22-jetski-sunset.jpg"
import moodBeachCap from "./assets/mood/23-beach-cap.jpg"
import moodCoconutCan from "./assets/mood/24-coconut-can.jpg"
import moodMarketTiger from "./assets/mood/25-market-tiger.jpg"
import moodLakeWade from "./assets/mood/32-lake-wade.jpg"
import moodGoldWings from "./assets/mood/34-gold-wings.jpg"
import moodSilkSkirtWalk from "./assets/mood/28-silk-skirt-walk.jpg"
import moodWindowLeopard from "./assets/mood/29-window-leopard.jpg"
import moodWineBarOlive from "./assets/mood/30-wine-bar-olive.jpg"
import gharMoolGhar from "./assets/ghar/mool-ghar-diyo-thumb.jpg"
import gharDashain from "./assets/ghar/dashain-tika-dog-thumb.jpg"
import gharTreePoseLake from "./assets/ghar/tree-pose-lake-thumb.jpg"
import twoCents001 from "./assets/twocents/001-mirror-glitch.jpg"
import twoCents002 from "./assets/twocents/002-kitchen-read.jpg"
import twoCents003 from "./assets/twocents/003-boot-golden-hour.jpg"

const NAV_ITEMS = [
  // `label` is what the fixed top nav shows; `cta` is the hero's button text.
  { id: "mood-board", label: "मूड बोर्ड", cta: "mood board" },
  { id: "ghar", label: "मूल घर", cta: "mool ghar" },
  { id: "two-cents", label: "२ पैसा", cta: "2 cents" },
]

// Hero media. Drop an mp4 (and optionally a webm) into `src` to make the hero move;
// leave `src` empty and the still `poster` renders instead. The poster also covers
// the first frame while the video loads, and stands in for visitors who have
// reduced motion turned on.
const HERO_MEDIA = {
  // Overhead, painting a green leaf on canvas with tubes and brushes on the
  // rug around it. 2:00–4:00 of the 7-minute painting.mov (HEVC, 606 MB, kept
  // out of git), cut with ffmpeg to 720x1280 H.264, no audio, faststart so it
  // streams from the first second: 8.3 MB. avconvert's presets either came
  // out ~75 MB or dropped to 320px wide, too soft for a full-bleed ground.
  src: heroVideo,
  webm: "",
  // The clip's own first frame, so poster and video match exactly.
  poster: heroPoster,
  alt: "Overhead view of a hand painting a green leaf on canvas, paint tubes and brushes on the rug around it",
  // The clip is portrait, so a wide hero crops it to a band; this keeps the
  // canvas in that band.
  position: "center 40%",
}

// Every 2 cents column opens the Instagram it actually lives on.
const INSTAGRAM_2CENTS = "https://www.instagram.com/2cents_at2am/"

const TWO_CENTS_POSTS = [
  {
    no: "002",
    image: twoCents002,
    imageAlt:
      "Reading at a kitchen table in Kathmandu, brass goblet and glasses out",
    imagePosition: "center 42%",
    kicker: "Jul 3, 2025",
    // In place of a title: a first-person note on when and how it was
    // written, with the line that set it off picked out, and a hook that is
    // the link through to the post.
    note: {
      text: "Penned at 2 AM, post-meltdown & mid‑smoke, with a soundtrack that apparently had something to say. breakdown turned into a breakthrough:",
      lyric: "I’m the one that introduced you to the you right now.",
      // The button draws its own → after this.
      hook: "see what 2 am me figured out",
    },
    excerpt:
      "To the girl I was and the person I am. Change is inevitable — you have already done things you once swore you never would. The only say you get is in which versions of yourself you carry forward.",
    instagram: "https://www.instagram.com/p/DLoiMmMgT-c/?img_index=1",
  },
  {
    no: "003",
    image: twoCents003,
    imageAlt:
      "Car doors open in a pine clearing at golden hour, reading in the boot",
    imagePosition: "center 62%",
    kicker: "Dec 22, 2025",
    note: {
      text: "Started painting with shrooms in my tea, thinking I’d play with colours. Ended up wandering through a universe I didn’t know existed inside me.",
      lyric: "The destination you seek has been within you all along.",
      hook: "Where Colours Took Me",
    },
    excerpt:
      "We are divine beings having a human experience, carrying a homesickness for somewhere we cannot point to. We never feel fully home here because home is not of this world. That ache is not emptiness — it is direction.",
    instagram: "https://www.instagram.com/p/DSmCTYwAA26/?img_index=1",
  },
  {
    no: "001",
    image: twoCents001,
    imageAlt:
      "Mirror selfie shot through a glitch filter, phone raised, paintings behind",
    imagePosition: "center 38%",
    kicker: "Apr 19, 2026",
    note: {
      text: (
        <>
          Wrote this on my{" "}
          <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
            तिथि
          </span>{" "}
          birthday! Unlike a Gregorian birthday that sticks to the same date
          every year, mine moves around with the lunar calendar.
        </>
      ),
      lyric: "The moon picks the day. I just show up.",
      hook: "What 29 felt like",
    },
    excerpt:
      "So ancient that even the devas do not know whose skull adorns her necklace — for they have never seen her without it.",
    instagram: "https://www.instagram.com/p/DXVfGzSAEZ-/?img_index=1",
  },
]

/* A post with `availableOn` stays "coming soon" until that day, in the
   reader's own time zone, then opens on its own. It takes a full date
   (YYYY-MM-DD) or just a year (YYYY), which opens on January 1. */
function availableDate(when: string) {
  return new Date(`${when.length === 4 ? `${when}-01-01` : when}T00:00`)
}

function isOpen(post: { availableOn?: string }) {
  return !post.availableOn || availableDate(post.availableOn) <= new Date()
}

function availableLabel(when: string) {
  if (when.length === 4) return `in ${when}`
  return `on ${availableDate(when).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}`
}

// Card thumbnails are pre-cropped with the subject dead centre, so the cover
// crop keeps it centred whatever shape the cell is; the posts use the originals.
const GHAR_POSTS = [
  {
    image: gharMoolGhar,
    imageAlt: "A diyo burning on the floor among marigold petals and sindoor",
    tag: "Origin Story",
    slug: "mool-ghar",
    title: "The meaning behind Mool Ghar",
    availableOn: "2026-10-21",
    body: "In my culture, mool ghar literally means \u201cancestral house,\u201d but the words hold much more than a building. It is the sacred, social and ritual centre of family life~ a place where ancestry, tradition and everyday life meet. If Newari culture is worth your time, come read along.",
    date: "Jul 30, 2026",
  },
  {
    image: gharDashain,
    imageAlt:
      "A dog on a Kathmandu balcony wearing tika and a marigold garland",
    tag: "Festivals",
    slug: "festival-calendar",
    title: (
      <>
        <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
          बाह्र महिना
        </span>
        , by Bikram Sambat
      </>
    ),
    availableOn: "2026-11-10",
    body: "Fun fact: I come from the future. Back home it is already 2083, and the new year lands in April, not January. Growing up, kheer meant Shrawan, Holi marked the end of winter, and Happu adorned with a marigold garland meant Tihar, heralding the beginning of winter. These are my twelve months, from Baisakh to Chaitra, remembered through the festivals, flavours, and little traditions that made them home.",
    date: "Jul 10, 2026",
  },
  {
    image: gharTreePoseLake,
    imageAlt:
      "Balancing in tree pose on a lakeside rock below snow-dusted mountains, in a cream sweater, black shorts and banana-print socks",
    tag: "Roots",
    title: "No, it does not snow where I am from",
    availableOn: "2027",
    body: "Kathmandu? Sort of. I am from Patan, the city across the river, and more precisely from Mangal Bazar, where Krishna Mandir, the old palace and more shrines than streets stand shoulder to shoulder. Here is the geography, the stone, and why the answer to the snow question is always no.",
    date: "Jun 28, 2026",
  },
]

// Captions run 60 characters or fewer so they sit on one line when a tile is
// hovered. `credits` is the outfit/venue tagging: each entry is what the thing
// is, plus an optional `brand` and `href`. With no brand it reads as a styling
// credit; add one and the chip carries it, linked if there is an href.
/* `brand` and `href` are optional: most credits are just the garment, and a
   few carry a label (and a link to it) once there is one to give. */
type MoodCredit = {
  item: string
  brand?: string
  href?: string
  // Phones drop credit links unless this is set.
  phoneLink?: boolean
}

/* `focus` is where the mood sits in the frame and `zoom` how far to push in
   on it, for the mosaic's cropped tiles. The reel ignores both and shows
   every photo whole. */
type MoodBoardImage = {
  image: string
  alt: string
  // Plain text, also used for screen-reader labels.
  caption: string
  // Optional styled version shown in place of `caption`, e.g. a crossed-out word.
  captionContent?: ReactNode
  credits?: MoodCredit[]
  focus?: string
  zoom?: number
}

const MOOD_BOARD_IMAGES: MoodBoardImage[] = [
  /* A colour board, ordered by outfit and light rather than by date. Day
     runs pale to dark: white and sky blue, blue, teal and turquoise, black
     over lake water, black and white, leopard, then brown. The jet ski
     sunset is the turn from day to night, and the night shots carry on
     from there: gold and brown, olive, and last the darkest, black with
     amber lenses. */
  {
    image: moodLakefrontSkyline,
    credits: [
      {
        item: "Columbia rain jacket",
        href: "https://www.columbia.com/c/womens-raincoats-jackets/",
      },
      {
        item: "jordan for kicks",
        href: "https://www.nike.com/w/womens-jordan-37eefz5e1x6",
      },
    ],
    alt: "Standing alone on a raked lakefront beach in a floral rain jacket, the Chicago skyline behind",
    caption: "lake and the skyline keeping company",
    focus: "50% 64%",
    zoom: 1.6,
  },
  {
    image: moodBeachCap,
    credits: [
      {
        item: "Target’s pink&white swimsuit",
        href: "https://www.target.com/c/swimsuits-women-s-clothing/-/N-5xtbw",
      },
    ],
    alt: "Sitting cross-legged on a beach towel in a blue cap and an oversized tee with a paisley bandeau",
    caption: "sand where it counts, concrete everywhere else",
    focus: "50% 40%",
    zoom: 1.4,
  },
  {
    image: moodSilkSkirtWalk,
    credits: [{ item: "silk maxi skirt" }, { item: "crochet crop" }],
    alt: "Walking down a leafy city sidewalk in a turquoise and orange silk maxi skirt",
    caption: "silk skirt, slow walk, nowhere to be",
    focus: "52% 50%",
    zoom: 1.45,
  },
  {
    image: moodLakeWade,
    credits: [{ item: "black tank" }, { item: "black shorts" }],
    alt: "From behind, wading knee-deep into a clear, glittering lake in a black tank and shorts, hair in a bun",
    caption: "hands on hips, staring down Lake Michigan",
    focus: "47% 50%",
    zoom: 1.4,
  },
  {
    image: moodCoconutCan,
    credits: [{ item: "overalls by Jordan" }],
    alt: "Holding a can of coconut water up in front of my face on a city sidewalk",
    caption: "in a world full of Celsius, coconut water to my rescue",
    focus: "54% 30%",
    zoom: 1.6,
  },
  {
    image: moodWindowLeopard,
    credits: [{ item: "leopard shirt" }, { item: "flared trousers" }],
    alt: "Sitting barefoot in a high-rise window in a leopard shirt and sunglasses, a plant beside me",
    caption: "window seat, complaints & PATRÓN Añejo",
    focus: "76% 50%",
    zoom: 1.6,
  },
  {
    image: moodMarketTiger,
    credits: [{ item: "bucket hat" }, { item: "brown rib tank" }],
    alt: "From behind at a market stall of rings and earrings, a tiger-eye tattoo on my shoulder",
    caption: "the tiger eye picks the earrings, I just pay",
    focus: "40% 48%",
    zoom: 1.5,
  },
  {
    image: moodJetskiSunset,
    alt: "Silhouette on a jet ski throwing a peace sign at sunset on the lake",
    caption: "apparently you dont need license to ride this baby",
    captionContent: (
      <>
        apparently you dont need license to <s className="caption-strike">fly</s>{" "}
        ride this baby
      </>
    ),
    focus: "46% 60%",
    zoom: 1.9,
  },
  {
    image: moodGoldWings,
    credits: [
      {
        item: "lace cap-sleeve tee",
        href: "https://www.abercrombie.com/shop/us/p/bra-free-reversible-scoopneck-top-63080321?faceout=model&seq=08&gridProductPosition=2",
        phoneLink: true,
      },
      {
        item: "brown wide-leg trousers",
        href: "https://www.abercrombie.com/shop/us/p/curve-love-a-and-f-sloane-tailored-wide-leg-pant-60567886?faceout=model&seq=85&gridProductPosition=2",
        phoneLink: true,
      },
    ],
    alt: "Standing at night in front of a pair of giant gold wing sculptures in a white lace tee and brown wide-leg trousers",
    caption: "heaven-sent wings, Abercrombie & Fitch fit",
    focus: "55% 56%",
    zoom: 1.4,
  },
  {
    image: moodWineBarOlive,
    credits: [{ item: "olive strapless dress from Artzia" }],
    alt: "Tongue out outside a wine bar at night in an olive button-front strapless dress",
    caption: "dressed for a wine list I fully did not read",
    focus: "47% 42%",
    zoom: 1.35,
  },
  {
    image: moodNightRose,
    credits: [
      {
        item: "baby tee from skims",
        href: "https://skims.com/products/cotton-jersey-t-shirt-soot",
        phoneLink: true,
      },
    ],
    alt: "Striking a pose at a bus stop at night with a single rose and amber sunglasses",
    caption: "copying homie's pose but with crystals & rose!",
    focus: "47% 52%",
    zoom: 1.35,
  },
]

/* Which mood board layout to show: the original "mosaic" or the "reel".
   Pick one with ?board=mosaic or ?board=reel in the address; the choice is
   remembered on that device so a tester keeps seeing the same one. With
   neither, the reel shows. The section carries data-board-variant so an
   analytics tool can split results by layout. */
type BoardVariant = "mosaic" | "reel"
const BOARD_VARIANTS: BoardVariant[] = ["mosaic", "reel"]
const BOARD_VARIANT_KEY = "mood-board-variant"

function useBoardVariant(): BoardVariant {
  const [variant] = useState<BoardVariant>(() => {
    try {
      const asked = new URLSearchParams(window.location.search).get("board")
      if (asked && (BOARD_VARIANTS as string[]).includes(asked)) {
        localStorage.setItem(BOARD_VARIANT_KEY, asked)
        return asked as BoardVariant
      }
      const saved = localStorage.getItem(BOARD_VARIANT_KEY)
      if (saved && (BOARD_VARIANTS as string[]).includes(saved)) {
        return saved as BoardVariant
      }
    } catch {
      // Storage blocked (private mode etc.): fall through to the default.
    }
    return "reel"
  })
  return variant
}

function Nav({
  active,
  onNav,
  onHome,
}: {
  active: string
  onNav: (id: string) => void
  onHome: () => void
}) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--color-earth)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "5.25rem",
        }}
      >
        <button
          className="nav-name"
          onClick={onHome}
          aria-label="Anushka Shrestha — back to top"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 3.2vw, 1.5rem)",
            fontWeight: 600,
            color: "var(--color-saffron)",
            letterSpacing: "-0.01em",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.72"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1"
          }}
        >
          Anushka Shrestha
        </button>
        <nav
          className="nav-links"
          style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.9375rem, 2.4vw, 1.25rem)",
                fontWeight: active === item.id ? 600 : 400,
                color:
                  active === item.id
                    ? "var(--color-saffron)"
                    : "var(--color-cream-dim)",
                letterSpacing: "0.02em",
                padding: "0.25rem 0",
                borderBottom:
                  active === item.id
                    ? "1.5px solid var(--color-saffron)"
                    : "1.5px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)
  const showVideo =
    Boolean(HERO_MEDIA.src) && !prefersReducedMotion && !videoFailed

  // Shared so the video and the still fill the frame identically.
  const mediaStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: HERO_MEDIA.position,
    display: "block",
    filter: "saturate(1.08) contrast(1.05)",
  } as const

  // The romanisation sits inline right after the Devanagari word, so each
  // line reads "कथा: Katha / Stories" rather than splitting across two.
  const gloss = {
    fontFamily: "var(--font-body)",
    fontSize: "22px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: "var(--color-saffron)",
  } as const

  // Small label, not part of the display stack.
  const kicker = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--color-cream-dim)",
    marginBottom: "0.9rem",
  } as const

  // Devanagari sits optically larger than Latin at the same size, so it is
  // scaled down slightly to make the two read as one weight.
  const devanagari = {
    fontFamily: "var(--font-devanagari)",
    fontSize: "21px",
  } as const

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        backgroundColor: "transparent",
        overflow: "hidden",
        minHeight: "40rem",
      }}
    >
      {/* Footage across the whole section, behind the text */}
      <div className="hero-media" aria-hidden={!showVideo}>
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_MEDIA.poster}
            aria-label={HERO_MEDIA.alt}
            onError={() => setVideoFailed(true)}
            style={mediaStyle}
          >
            {HERO_MEDIA.webm ? (
              <source src={HERO_MEDIA.webm} type="video/webm" />
            ) : null}
            <source src={HERO_MEDIA.src} type="video/mp4" />
          </video>
        ) : (
          <img src={HERO_MEDIA.poster} alt={HERO_MEDIA.alt} style={mediaStyle} />
        )}

        {/* Holds the footage in the palette. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-oxblood)",
            mixBlendMode: "soft-light",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        {/* Darkens the side the text sits on so it stays readable. */}
        <div className="hero-scrim" aria-hidden="true" />
      </div>

      <div
        className="hero-text"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "7rem 3.5rem 3.5rem",
          minHeight: "34rem",
          maxWidth: "44rem",
        }}
      >
        <h1
          className="hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: 1.7,
            color: "var(--color-cream)",
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          <span className="hero-kicker" style={kicker}>
            Nush&rsquo;s
          </span>
          <span className="hero-lines-desktop">
            <span className="hero-dev" lang="ne" style={devanagari}>
              कथा
            </span>
            <span className="hero-gloss" style={gloss}>: Katha / Stories</span>
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-saffron)" }}>
              outfits
            </em>{" "}
            &amp;
            <br />
            essence of{" "}
            <span className="hero-dev" lang="ne" style={devanagari}>
              घर
            </span>
            <span className="hero-gloss" style={gloss}>: Ghar / Home</span>
          </span>
          {/* Phone-only title: one tight funky line, no glosses. */}
          <span className="hero-lines-mobile">
            <span className="hm-line">
              <span className="hm-dev hm-tilt-l" lang="ne">कथा</span>
              <span className="hm-comma">,</span>{" "}
              <span className="hm-outfits">outfits</span>{" "}
              <span className="hm-amp">&amp;</span>{" "}
              <span className="hm-dev hm-tilt-r" lang="ne">घर</span>
            </span>
          </span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-cream-dim)",
            marginTop: "1.15rem",
            marginBottom: 0,
            maxWidth: "30rem",
          }}
        >
          Welcome to my corner of the internet where my real-world chaos gets a carefully
          curated digital presence through mood boards, outfits, 2 cents and
          some facts about home. home is abstract but facts aren't.
        </p>

        <div
          className="hero-ctas"
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textDecoration: "none",
                padding: "0.65rem 1.35rem",
                border: "1px solid var(--color-border)",
                color: "var(--color-cream)",
                borderRadius: "2px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = "var(--color-saffron)"
                el.style.borderColor = "var(--color-saffron)"
                el.style.color = "var(--color-ember)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = "transparent"
                el.style.borderColor = "var(--color-border)"
                el.style.color = "var(--color-cream)"
              }}
            >
              {item.cta}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative label */}
      <div
        className="hero-label"
        style={{
          position: "absolute",
          bottom: "3rem",
          right: "2rem",
          zIndex: 1,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontFamily: "var(--font-body)",
          fontSize: "0.6875rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-saffron)",
          textShadow: "0 1px 6px rgba(45,10,6,0.85)",
        }}
      >
        Work in progress
      </div>

      <a href="#socials" className="hero-cta">
        who, me?
      </a>
    </section>
  )
}

function TwoCents() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="two-cents"
      className="twocents-section"
      style={{
        backgroundColor: "transparent",
        padding: "3.5rem 0 7rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--color-cream)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
              २ पैसा
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-saffron)",
                letterSpacing: "0.04em",
                marginTop: "0.6rem",
              }}
            >
              2 cents — two paisa, freely given
            </span>
          </h2>
          <p
            className="twocents-intro"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-cream-dim)",
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            this is basically my 2 cents, which started at a random 2 AM. the
            occasional revelation I still stand by in daylight.
          </p>
          <a
            className="twocents-ig-link"
            href={INSTAGRAM_2CENTS}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--color-saffron)",
              textDecoration: "none",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "0.15rem",
              marginTop: "1.25rem",
            }}
          >
            @2cents_at2am on Instagram →
          </a>
        </div>

        {/* Three columns, one per post */}
        <div
          className="twocents-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
            gap: "1.75rem",
          }}
        >
          {TWO_CENTS_POSTS.map((post) => (
            <article
              key={post.no}
              onMouseEnter={() => setHovered(post.no)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor:
                  hovered === post.no
                    ? "var(--color-saffron)"
                    : "var(--color-border)",
                backgroundColor: "rgba(248,236,224,0.04)",
                transition: "border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: post.imagePosition,
                    display: "block",
                    transform: hovered === post.no ? "scale(1.04)" : "none",
                    transition: "transform 0.4s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "1.75rem 1.5rem",
                }}
              >

                {/* The CTA, pinned to the bottom so the columns line up. */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1.75rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  {/* The note is the link: date, backstory, the line, and the hook. */}
                  <a
                    className="twocents-note"
                    href={post.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="twocents-note-date">{post.kicker}</span>
                    <span className="twocents-note-text">
                      {post.note.text}
                    </span>
                    {post.note.lyric ? (
                      <span className="twocents-note-lyric">
                        {post.note.lyric}
                      </span>
                    ) : null}
                    <span className="twocents-note-go">
                      {post.note.hook}
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Phone-only nudge to the Instagram, under the swipe row. */}
        <p className="twocents-more">
          My 2 AM brain has more to say. They live on my Insta{" "}
          <a
            href={INSTAGRAM_2CENTS}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="2 cents on Instagram"
          >
            →
          </a>
        </p>
      </div>
    </section>
  )
}

function Ghar() {
  const [hovered, setHovered] = useState<number | null>(null)
  // A post that is not out yet keeps its card but loses its link.
  const posts = GHAR_POSTS.map((post) =>
    isOpen(post) ? post : { ...post, slug: undefined },
  )

  return (
    <section
      id="ghar"
      style={{
        backgroundColor: "transparent",
        padding: "3.5rem 0 7rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "4rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--color-cream)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
              मूल घर
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-saffron)",
                letterSpacing: "0.04em",
                fontStyle: "normal",
                marginTop: "0.6rem",
              }}
            >
              <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
                मूल
              </span>
              {" / Mool; Mul = root. "}
              <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
                घर
              </span>
              {" / Ghar = home."}
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-cream-dim)",
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            As the name spells out: a space rooted in memory, tradition and
            heritage. Once fact, now belief — those are the stories that live
            here.
          </p>
        </div>

        {/* Posts */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {posts.map((post, i) => (
            <article
              key={i}
              className="ghar-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (post.slug) window.location.hash = `#/blog/${post.slug}`
              }}
              style={{
                gap: "0",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                cursor: post.slug ? "pointer" : "default",
                transition: "border-color 0.2s ease",
                borderColor:
                  hovered === i
                    ? "var(--color-saffron)"
                    : "var(--color-border)",
              }}
            >
              {/* Fills the row the text column sets rather than holding a
                  fixed 16/9 box: no dead space under the photo, and a near
                  square cell keeps far more of a portrait frame in view. */}
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  minHeight: "12.5rem",
                  overflow: "hidden",
                  backgroundColor: "rgba(248,236,224,0.08)",
                }}
              >
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transform: hovered === i ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.5s ease",
                    filter: "brightness(0.95)",
                  }}
                />
              </div>
              <div
                className="ghar-card-body"
                style={{
                  padding: "2.5rem 3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "rgba(248,236,224,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--color-saffron)",
                      fontWeight: 600,
                    }}
                  >
                    {post.tag}
                  </span>
                </div>
                <h3
                  className="ghar-card-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                    lineHeight: 1.3,
                    color: "var(--color-cream)",
                    margin: "0 0 1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "var(--color-cream-dim)",
                    margin: "0 0 1.5rem",
                  }}
                >
                  {post.body}
                </p>
                {post.slug ? (
                  <a
                    href={`#/blog/${post.slug}`}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color:
                        hovered === i
                          ? "var(--color-saffron)"
                          : "var(--color-cream-dim)",
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                  >
                    Read more →
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "var(--color-border)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Coming soon
                    {post.availableOn ? (
                      <>
                        {" · "}
                        <span className="ghar-soon-date">
                          available {availableLabel(post.availableOn)}
                        </span>
                      </>
                    ) : null}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MoodBoard() {
  const [hovered, setHovered] = useState<number | null>(null)
  // Phones get the outfit credits as plain text, bar the few marked phoneLink.
  const isPhone = useIsPhone()
  const linkCredit = (credit: MoodCredit) =>
    Boolean(credit.href) && (!isPhone || Boolean(credit.phoneLink))
  const variant = useBoardVariant()

  return (
    <section
      id="mood-board"
      data-board-variant={variant}
      style={{
        backgroundColor: "transparent",
        padding: "3rem 0 4.5rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Header in one row: the title on the left, a one-line blurb and the
            link to older boards on the right, so the photos start sooner. */}
        <div className="mood-head">
          <h2 className="mood-title">
            <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
              मूड बोर्ड
            </span>
            <span className="mood-sub">mood board</span>
          </h2>
          <div className="mood-head-aside">
            <p className="mood-blurb">
              turns out Kanye was right about summer Chi ~
              <br />
              here&rsquo;s mine in a scroll: lake days, late nights,
              <br />
              &amp; outfits that got their mileage!
            </p>
            {/* Placeholder — swap the span for <a href="..."> once older
                boards have a page. */}
            <span className="mood-more">moodier boards →</span>
          </div>
        </div>

        {variant === "reel" ? (
          <MoodReel items={MOOD_BOARD_IMAGES} season="summer ’26" />
        ) : (
        /* Mosaic — every cell filled, photos cropped to fit. */
        <div className="mood-mosaic">
          {MOOD_BOARD_IMAGES.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`mood-tile${hovered === i ? " is-lit" : ""}`}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "rgba(248,236,224,0.08)",
                border: "1px solid var(--color-border)",
                // The hovered tile lifts and tilts; the others fall back.
                transform:
                  hovered === i
                    ? "scale(1.025) rotate(-1.1deg)"
                    : hovered === null
                      ? "none"
                      : "scale(0.985)",
                filter:
                  hovered !== null && hovered !== i
                    ? "brightness(0.66)"
                    : "none",
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: item.focus,
                  display: "block",
                  // One vintage grade across every tile, so ten photos taken
                  // on different days and cameras sit as one set. Hover eases
                  // the wash off rather than swapping the look.
                  filter:
                    hovered === i
                      ? "sepia(0.16) saturate(1.16) contrast(1.06) brightness(1.02) hue-rotate(-4deg)"
                      : "sepia(0.36) saturate(1.05) contrast(1.05) brightness(0.95) hue-rotate(-8deg)",
                  transformOrigin: item.focus ?? "center",
                  transform: `scale(${(item.zoom ?? 1) * (hovered === i ? 1.03 : 1)})`,
                }}
              />
              {/* Warm wash that burns off as you point at it. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(180deg, rgba(138,43,37,0.32) 0%, rgba(168,67,50,0.1) 45%, rgba(247,191,99,0.22) 100%)",
                  opacity: hovered === i ? 0.25 : 0.7,
                  transition: "opacity 0.45s ease",
                }}
              />
              {/* Credits: what is in the frame, and who made it once a brand
                  is filled in. Top-left so they never crowd the caption. */}
              {item.credits ? (
                <div
                  className="mood-credits"
                  style={{
                    position: "absolute",
                    top: "0.85rem",
                    left: "0.85rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.3rem",
                    opacity: hovered === i ? 1 : 0,
                    pointerEvents: hovered === i ? "auto" : "none",
                  }}
                >
                  {item.credits.map((credit, c) => (
                    <span
                      key={credit.item}
                      className="mood-credit"
                      style={{
                        display: "inline-flex",
                        alignItems: "baseline",
                        gap: "0.4rem",
                        padding: "0.28rem 0.55rem",
                        borderRadius: "2px",
                        border: "1px solid rgba(248,236,224,0.16)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        lineHeight: 1.2,
                        opacity: hovered === i ? 1 : 0,
                        transform:
                          hovered === i
                            ? "translateY(0)"
                            : "translateY(-0.35rem)",
                        // Chips arrive one after another rather than together.
                        transitionDelay: hovered === i ? `${c * 70}ms` : "0ms",
                      }}
                    >
                      <span
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--color-marigold)",
                        }}
                      >
                        {/* With no brand to carry the link, the item does. */}
                        {linkCredit(credit) && !credit.brand ? (
                          <a
                            href={credit.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit" }}
                          >
                            {credit.item}
                          </a>
                        ) : (
                          credit.item
                        )}
                      </span>
                      {credit.brand ? (
                        <span style={{ color: "var(--color-cream)" }}>
                          {linkCredit(credit) ? (
                            <a
                              href={credit.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "inherit" }}
                            >
                              {credit.brand}
                            </a>
                          ) : (
                            credit.brand
                          )}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Caption only turns up while you linger on the tile. */}
              <div
                className="mood-caption"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "1.4rem 1rem 0.85rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  lineHeight: 1.35,
                  letterSpacing: "0.01em",
                  color: "var(--color-cream)",
                  textShadow: "0 1px 6px rgba(28,8,6,0.9)",
                  background:
                    "linear-gradient(180deg, rgba(28,8,6,0) 0%, rgba(28,8,6,0.78) 60%, rgba(28,8,6,0.92) 100%)",
                  opacity: hovered === i ? 1 : 0,
                  transform:
                    hovered === i ? "translateY(0)" : "translateY(0.5rem)",
                  pointerEvents: "none",
                }}
              >
                {item.captionContent ?? item.caption}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

// Icon paths are 24x24. Instagram, Pinterest, TikTok and LinkedIn are the official
// brand marks; Lemon8 has no published icon set, so it's a lemon with a cut-out "8".
const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/anushkanuska/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/anushkanuskanushka/",
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  },
  {
    name: "Lemon8",
    href: "https://www.lemon8-app.com/@anushkanuska",
    path: "M3 21c-2.5-2.5-.6-9.3 4.2-14.1C12 2.1 18.8.2 21.3 2.7s.6 9.3-4.2 14.1C12.3 21.6 5.5 23.5 3 21ZM12.6 6.7a2.7 2.7 0 1 0 0 5.4a2.7 2.7 0 1 0 0-5.4ZM12.6 8a1.4 1.4 0 1 0 0 2.8a1.4 1.4 0 1 0 0-2.8ZM12.2 11.7a3.3 3.3 0 1 0 0 6.6a3.3 3.3 0 1 0 0-6.6ZM12.2 13.2a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 1 0 0-3.6Z",
    fillRule: "evenodd" as const,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@anushkanuska",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anushkashrestha8823/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
]

// A course of telia itta laid between two sections. It takes the colour of the
// section above and the one below, so each seam is literally where those two
// grounds meet rather than a hard line between them.
function BrickSeam() {
  return <div className="brick-seam" aria-hidden="true" />
}

function Socials() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="socials"
      style={{
        /* Photograph under a scrim in the pour's own colours: dark at the top
           where it meets the section above and at the foot where it meets the
           footer, lifted through the middle so the picture reads. The wash is
           what keeps cream type at 6:1 or better over the snow in it. */
        backgroundImage:
          "linear-gradient(to bottom, rgba(74,44,36,0.92) 0%, rgba(51,32,26,0.74) 45%, rgba(51,32,26,0.9) 100%)," +
          `url(${socialsBackdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center 45%",
        backgroundRepeat: "no-repeat",
        borderTop: "1px solid var(--color-border)",
        padding: "4rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-saffron)",
            margin: 0,
          }}
        >
          Socials
        </p>
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              onMouseEnter={() => setHovered(social.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "50%",
                border: "1px solid",
                borderColor:
                  hovered === social.name
                    ? "var(--color-saffron)"
                    : "var(--color-border)",
                backgroundColor:
                  hovered === social.name
                    ? "var(--color-saffron)"
                    : "transparent",
                color:
                  hovered === social.name
                    ? "var(--color-earth)"
                    : "var(--color-cream-dim)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                fillRule={social.fillRule ?? "nonzero"}
                aria-hidden="true"
                focusable="false"
              >
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer({ onHome }: { onHome: () => void }) {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-earth)",
        borderTop: "1px solid var(--color-border)",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={onHome}
          aria-label="Anushka Shrestha — back to top"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "var(--color-cream)",
            fontWeight: 400,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.72"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1"
          }}
        >
          Anushka Shrestha
        </button>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-cream-dim)",
          }}
        >
          made by roro
        </span>
      </div>
    </footer>
  )
}

/* Sign-ups are relayed by FormSubmit (formsubmit.co): no backend, no account.
   The first submission sends a one-time activation email to this address;
   nothing is delivered until that link is clicked. */
const SIGNUP_INBOX = "anushka8823@icloud.com"

function EmailPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  )

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SIGNUP_INBOX}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "New sign-up from the site ✦",
          _template: "table",
          _captcha: "false",
        }),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "rgba(61,20,18,0.7)",
        backdropFilter: "blur(4px)",
        animation: "popup-fade 0.3s ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-popup-title"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "30rem",
          backgroundColor: "var(--color-paper)",
          border: "2px solid var(--color-paper-ink)",
          boxShadow: "10px 10px 0 var(--color-saffron)",
          padding: "3rem 2.5rem 2rem",
          transform: "rotate(-1deg)",
          animation: "popup-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Sticker */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: "-1.25rem",
            width: "5.5rem",
            height: "5.5rem",
            borderRadius: "50%",
            backgroundColor: "var(--color-teal)",
            color: "var(--color-paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            lineHeight: 1.05,
            border: "2px solid var(--color-paper-ink)",
            animation: "popup-wiggle 2.4s ease-in-out infinite",
          }}
        >
          psst!
          <br />✦
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-terracotta)",
            margin: "0 0 1rem",
          }}
        >
          नमस्ते, stranger :)
        </p>

        <h2
          id="email-popup-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 6vw, 2.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-paper-ink)",
            margin: 0,
          }}
        >
          Oi! Don't just{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-saffron)" }}>
            lurk
          </em>
          .
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.975rem",
            lineHeight: 1.65,
            color: "var(--color-paper-dim)",
            margin: "1rem 0 1.75rem",
          }}
        >
          Get my 2 cents, a peek inside Mool Ghar and whatever's pinned to the
          mood board, delivered straight to your inbox. No spam. Only
          chiya-fuelled rambles. ☕
        </p>

        {status === "done" ? (
          <p
            role="status"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "1.35rem",
              lineHeight: 1.3,
              color: "var(--color-teal)",
              margin: 0,
            }}
          >
            You're in! Chiya's on me. ✦
          </p>
        ) : (
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
        >
          <input
            type="email"
            required
            disabled={status === "sending"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.cool"
            aria-label="Email address"
            style={{
              flex: "1 1 12rem",
              minWidth: 0,
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              padding: "0.8rem 1rem",
              backgroundColor: "var(--color-paper)",
              color: "var(--color-paper-ink)",
              border: "2px solid var(--color-paper-ink)",
              borderRadius: 0,
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              flex: "0 0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.8rem 1.25rem",
              backgroundColor: "var(--color-saffron)",
              color: "var(--color-paper-ink)",
              border: "2px solid var(--color-paper-ink)",
              boxShadow: "4px 4px 0 var(--color-paper-ink)",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)"
              e.currentTarget.style.boxShadow =
                "2px 2px 0 var(--color-paper-ink)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow =
                "4px 4px 0 var(--color-paper-ink)"
            }}
          >
            {status === "sending" ? "Sending…" : "Count me in →"}
          </button>
          {status === "error" && (
            <p
              role="alert"
              style={{
                flexBasis: "100%",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--color-terracotta)",
                margin: 0,
              }}
            >
              Hmm, that didn't go through. Mind trying again?
            </p>
          )}
        </form>
        )}

        <button
          onClick={() => setOpen(false)}
          style={{
            display: "block",
            margin: "1.5rem auto 0",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-paper-dim)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {status === "done"
            ? "धन्यवाद! now go snoop around →"
            : "nah, I'll keep lurking"}
        </button>
      </div>
    </div>
  )
}

/* Routing is the hash and nothing else: `#/blog/<slug>` is a post, anything
   else is the front page. No router dependency, and it survives being served
   as static files from any host. */
const postSlugFrom = (hash: string) =>
  hash.startsWith("#/blog/") ? hash.slice("#/blog/".length) : ""

export default function App() {
  const [activeSection, setActiveSection] = useState("")
  const [hash, setHash] = useState(() => window.location.hash)
  /* A section the reader asked for from inside a post: the front page has to
     mount before there is anything to scroll to. */
  const pendingSection = useRef<string | null>(null)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const post = getPost(postSlugFrom(hash))

  useEffect(() => {
    if (post) {
      window.scrollTo({ top: 0 })
      return
    }
    const id = pendingSection.current
    if (id) {
      pendingSection.current = null
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [post])

  useEffect(() => {
    if (post) return
    const sections = NAV_ITEMS.map((item) => item.id)
    const onScreen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target.id)
          else onScreen.delete(entry.target.id)
        })
        /* Whichever crossing section comes first on the page wins, and when
           none of them is crossing — up in the hero, down in the footer — the
           mark comes off the nav entirely rather than staying on whatever the
           reader last passed. */
        setActiveSection(sections.find((id) => onScreen.has(id)) ?? "")
      },
      /* Collapses the root to a band across the middle of the viewport, so a
         section counts as the one being read only while it crosses the
         reader's eyeline. Sections here are taller than the screen, which a
         plain visibility ratio handles badly. */
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [post])

  const scrollTo = (id: string) => {
    if (post) {
      pendingSection.current = id
      window.location.hash = ""
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollHome = () => {
    if (post) {
      window.location.hash = ""
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Nav
        active={post ? "" : activeSection}
        onNav={scrollTo}
        onHome={scrollHome}
      />
      {post ? (
        <main style={{ paddingTop: "5.25rem" }}>
          <BlogPage post={post} />
        </main>
      ) : (
        <>
          <EmailPopup />
          <Hero />
          <BrickSeam />
          <MoodBoard />
          <BrickSeam />
          <Ghar />
          <BrickSeam />
          <TwoCents />
          <Socials />
        </>
      )}
      <Footer onHome={scrollHome} />
    </>
  )
}
