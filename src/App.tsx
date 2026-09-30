import { useState, useEffect, useRef } from "react"

import BlogPage from "./BlogPage"
import { getPost } from "./blogPosts"

import heroVideo from "./assets/hero/water.mp4"
import heroPoster from "./assets/hero/water.jpg"
import socialsBackdrop from "./assets/footer-media/basecamp-2021.jpg"
import moodBeachBook from "./assets/mood/04-beach-book.jpg"
import moodMirrorSelfie from "./assets/mood/06-mirror-selfie.jpg"
import moodNightOut from "./assets/mood/07-night-out.jpg"
import moodRailroadDusk from "./assets/mood/08-railroad-dusk.jpg"
import moodOakUnderpass from "./assets/mood/10-oak-underpass.jpg"
import moodNightWalk from "./assets/mood/11-night-walk.jpg"
import moodBarMirror from "./assets/mood/18-bar-mirror.jpg"
import moodShopCat from "./assets/mood/16-shop-cat.jpg"
import moodBedPlants from "./assets/mood/17-bed-plants.jpg"
import moodCrownedSkull from "./assets/mood/14-crowned-skull.jpg"
import gharMoolGhar from "./assets/ghar/mool-ghar-diyo.jpg"
import gharDashain from "./assets/ghar/dashain-tika-dog.jpg"
import gharPujaThali from "./assets/ghar/puja-thali-rose.jpg"
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
  // Looking down over the bow of a blue wooden boat onto green water, bare
  // feet and an orange skirt in frame. 9.5s, so it loops whole. Converted
  // from the source .MOV (QuickTime will not play outside Safari) and shipped
  // at the source 1080x1920 (5.8 MB) — the smaller avconvert preset came out
  // heavier, same as the clip before it.
  src: heroVideo,
  webm: "",
  // The clip's own first frame, so poster and video match exactly.
  poster: heroPoster,
  alt: "Looking down over the bow of a blue wooden boat onto still green water",
}

// Every 2 cents column opens the Instagram it actually lives on.
const INSTAGRAM_2CENTS = "https://www.instagram.com/2cents_at2am/"

const TWO_CENTS_POSTS = [
  {
    no: "001",
    image: twoCents001,
    imageAlt:
      "Mirror selfie shot through a glitch filter, phone raised, paintings behind",
    imagePosition: "center 38%",
    kicker: "अक्षय तृतीया edition",
    title: "the one whose skull she wears",
    excerpt:
      "So ancient that even the devas do not know whose skull adorns her necklace — for they have never seen her without it.",
    instagram: "https://www.instagram.com/p/DXVfGzSAEZ-/?img_index=1",
  },
  {
    no: "002",
    image: twoCents002,
    imageAlt:
      "Reading at a kitchen table in Kathmandu, brass goblet and glasses out",
    imagePosition: "center 42%",
    kicker: "Jul 2, 2025",
    title: "to the वोमन I'm to be",
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
    title: "you are not lost, you are remembering",
    excerpt:
      "We are divine beings having a human experience, carrying a homesickness for somewhere we cannot point to. We never feel fully home here because home is not of this world. That ache is not emptiness — it is direction.",
    instagram: "https://www.instagram.com/p/DSmCTYwAA26/?img_index=1",
  },
]

const GHAR_POSTS = [
  {
    image: gharMoolGhar,
    imageAlt: "A diyo burning on the floor among marigold petals and sindoor",
    tag: "Origin Story",
    slug: "mool-ghar",
    title: "The meaning behind Mool Ghar",
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
    body: "Nepal runs on Bikram Sambat, roughly 57 years ahead of the Gregorian calendar, with the year turning over in mid-April. Twelve months, Baisakh through Chaitra, and each one arrives with its own weather and its own festivals, so the calendar doubles as the forecast: when to plant, when to feast, when the sky finally clears. Call it religion, call it scheduling. It works.",
    date: "Jul 10, 2026",
  },
  {
    image: gharPujaThali,
    imageAlt:
      "A puja thali of flowers, banana and sindoor beside a hand in red bangles holding a rose",
    tag: "Roots",
    title: "No, it does not snow where I am from",
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
}

type MoodBoardImage = {
  image: string
  alt: string
  caption: string
  credits?: MoodCredit[]
  position?: string
}

const MOOD_BOARD_IMAGES: MoodBoardImage[] = [
  {
    image: moodCrownedSkull,
    alt: "A matte black skull in a gold glitter crown, held up in one hand",
    caption: "he's dead, he's royal, he's coming home with me",
  },
  {
    image: moodRailroadDusk,
    credits: [{ item: "denim jacket" }, { item: "denim shorts" }],
    alt: "Standing on the railroad tracks at dusk, pointing at the sky",
    caption: "double denim on the tracks, blue hour did the rest",
  },
  {
    image: moodMirrorSelfie,
    credits: [{ item: "lounge set" }],
    alt: "Mirror selfie under warm bathroom lights",
    caption: "nothing on the calendar, everything on the lighting",
  },
  {
    image: moodBarMirror,
    credits: [{ item: "head wrap" }],
    alt: "Reflected in a back-bar mirror between bottles, in a black head wrap",
    position: "center 45%",
    caption: "caught my own eye somewhere between rum and tequila",
  },
  {
    image: moodShopCat,
    credits: [{ item: "trench" }],
    alt: "Holding a black cat in a wicker basket inside a crystal shop",
    position: "center 40%",
    caption: "came for crystals, got adopted by the house witch",
  },
  {
    image: moodBeachBook,
    credits: [{ item: "bucket hat" }, { item: "amber lenses" }],
    alt: "Beach day with a fashion book open on the table",
    caption: "bucket hat, amber lenses, runway pages",
  },
  {
    image: moodOakUnderpass,
    credits: [{ item: "striped knit coat" }],
    alt: "Leaning under the Oak St pedestrian underpass sign at night",
    caption: "outdressed the entire underpass, nobody was there",
  },
  {
    image: moodNightOut,
    credits: [{ item: "olive button dress" }],
    alt: "Night out in an olive button-front dress",
    caption: "dressed for a wine list I fully did not read",
  },
  {
    image: moodNightWalk,
    credits: [{ item: "hooded jacket" }, { item: "wide-leg trousers" }],
    alt: "Walking a Chicago sidewalk at night, skyline lit behind",
    caption: "romanticising the walk home, as one does",
  },
  {
    image: moodBedPlants,
    alt: "Lying on a bed surrounded by houseplants, prayer flags on the wall",
    caption: "home away from Home",
  },
]

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
        <nav style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
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
    objectPosition: "center 72%",
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
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "7rem 3.5rem 3.5rem",
          minHeight: "34rem",
        }}
      >
        <h1
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
          <span style={kicker}>Nush&rsquo;s</span>
          <span lang="ne" style={devanagari}>
            कथा
          </span>
          <span style={gloss}>: Katha / Stories</span>
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-saffron)" }}>
            outfits
          </em>{" "}
          &amp;
          <br />
          essence of{" "}
          <span lang="ne" style={devanagari}>
            घर
          </span>
          <span style={gloss}>: Ghar / Home</span>
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

      {/* Right — video (or still fallback), graded warm and melted into the ground */}
      <div
        style={{ position: "relative", overflow: "hidden", minHeight: "34rem" }}
      >
        <div className="hero-media">
          <div className="hero-media-inner">
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
              <img
                src={HERO_MEDIA.poster}
                alt={HERO_MEDIA.alt}
                style={mediaStyle}
              />
            )}

            {/* Just enough to hold the footage in the palette. The pour is a
            light red up here, so this leans on the dark end of the range — a
            soft-light pass in the ground's own colour washed the clip pale. */}
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
          </div>
        </div>

        {/* Decorative label */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            right: "2rem",
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
          Begnas Lake, Nepal
        </div>

        {/* Sits outside the masked wrappers so it stays solid where the
            footage has already dissolved into the pour. */}
        <a href="#socials" className="hero-cta">
          who, me?
        </a>
      </div>
    </section>
  )
}

function TwoCents() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="two-cents"
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
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-cream-dim)",
              marginTop: "1.5rem",
              marginBottom: 0,
              maxWidth: "42rem",
            }}
          >
            this is basically my 2 cents, which started at a random 2 AM. the
            occasional revelation I still stand by in daylight.
          </p>
          <a
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
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-saffron)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {post.no} · {post.kicker}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "1.375rem",
                    lineHeight: 1.3,
                    color: "var(--color-cream)",
                    letterSpacing: "-0.01em",
                    margin: "0.85rem 0 0.75rem",
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
                    margin: 0,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Two CTAs, pinned to the bottom so the columns line up. */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1.75rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  {/* Placeholder — swap for <a href="..."> once the blog post exists. */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.6rem 1rem",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-cream)",
                      cursor: "pointer",
                    }}
                  >
                    read the full blog
                  </span>
                  <a
                    href={post.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.6rem 1rem",
                      border: "1px solid var(--color-saffron)",
                      backgroundColor: "var(--color-saffron)",
                      color: "var(--color-earth)",
                      textDecoration: "none",
                    }}
                  >
                    open the insta post →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ghar() {
  const [hovered, setHovered] = useState<number | null>(null)

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
              maxWidth: "38rem",
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
          {GHAR_POSTS.map((post, i) => (
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
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "rgba(160,144,128,0.6)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <h3
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
  const [linkHovered, setLinkHovered] = useState(false)

  return (
    <section
      id="mood-board"
      style={{
        backgroundColor: "transparent",
        padding: "3.5rem 0 7rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
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
              मूड बोर्ड
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-marigold)",
                letterSpacing: "0.04em",
                marginTop: "0.6rem",
              }}
            >
              mood board
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
              maxWidth: "38rem",
            }}
          >
            welcome to my brain, time of the month ~ this round is the last of
            summer refusing to leave! nothing here is in order, and half of it
            happened after dark.
          </p>
        </div>

        {/* Placeholder — swap the span for <a href="..."> once the summer '26 page exists. */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: linkHovered
                ? "var(--color-marigold)"
                : "var(--color-cream-dim)",
              borderBottom: "1px solid",
              borderColor: linkHovered
                ? "var(--color-marigold)"
                : "var(--color-border)",
              paddingBottom: "0.15rem",
              cursor: "pointer",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
          >
            click for moodier boards
          </span>
        </div>

        {/* Mosaic — every cell filled, photos cropped to fit. */}
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
                  objectPosition: item.position,
                  display: "block",
                  // One vintage grade across every tile, so ten photos taken
                  // on different days and cameras sit as one set. Hover eases
                  // the wash off rather than swapping the look.
                  filter:
                    hovered === i
                      ? "sepia(0.16) saturate(1.16) contrast(1.06) brightness(1.02) hue-rotate(-4deg)"
                      : "sepia(0.36) saturate(1.05) contrast(1.05) brightness(0.95) hue-rotate(-8deg)",
                  transform: hovered === i ? "scale(1.03)" : "none",
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
                        backgroundColor: "rgba(28,8,6,0.62)",
                        backdropFilter: "blur(3px)",
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
                        {credit.item}
                      </span>
                      {credit.brand ? (
                        <span style={{ color: "var(--color-cream)" }}>
                          {credit.href ? (
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
                {item.caption}
              </div>
            </div>
          ))}
        </div>
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
          © 2026 · made with love by roro &amp; nush
        </span>
      </div>
    </footer>
  )
}

function EmailPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")

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

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
        >
          <input
            type="email"
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
            Count me in →
          </button>
        </form>

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
          nah, I'll keep lurking
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
          <BlogPage post={post} onHome={scrollHome} />
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
