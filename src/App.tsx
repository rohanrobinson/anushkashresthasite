import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'mood-board', label: 'mood board' },
  { id: 'ghar', label: 'm:)L ghar' },
  { id: 'two-cents', label: '2 cents' },
]

const TWO_CENTS_POSTS = [
  {
    no: '001',
    date: 'Jul 28, 2026',
    title: 'On the quiet power of doing things slowly',
    excerpt:
      "We've been sold the idea that busyness is a badge of honour. But lately I've been thinking about what we sacrifice when we mistake speed for progress — and what we recover when we finally stop.",
    readTime: '4 min read',
  },
  {
    no: '002',
    date: 'Jun 14, 2026',
    title: 'Why I stopped apologising for my opinions',
    excerpt:
      "There's a particular politeness that women are trained into — the reflexive hedge, the \"just my opinion,\" the careful softening of every strong thought. I'm done with that.",
    readTime: '6 min read',
  },
  {
    no: '003',
    date: 'May 3, 2026',
    title: 'Homesickness is a strange kind of love',
    excerpt:
      "Missing a place isn't sadness exactly. It's more like carrying a room inside you — one you can visit anytime, but can never quite step into again.",
    readTime: '5 min read',
  },
]

const GHAR_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1784206049415-f8b1cd8e02de?w=800&h=500&fit=crop&auto=format',
    tag: 'Origin Story',
    title: "What even is Mool Ghar? (Spoiler: it's not just a house)",
    body: "Mool = root. Ghar = home. Mash them together and you get the place your soul keeps a spare key to: the ancestral house, the loud kitchen, the chaos you'd never trade. This little corner of the internet is my version of it.",
    date: 'Jul 30, 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&auto=format',
    tag: 'Festivals',
    title: 'Dashain vs Dussehra: same season, two very different stories',
    body: "Across the border in India, Dussehra celebrates Lord Ram's victory over Ravana. In Nepal, Dashain honours Goddess Durga's triumph over the demon Mahishasura, with tika, jamara, kites and a whole lot of family. Here's how one season tells two stories.",
    date: 'Jul 10, 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1716453164623-fedc529b8daa?w=800&h=500&fit=crop&auto=format',
    tag: 'Travel',
    title: "Let's talk about Rasuwa!",
    body: 'High up in Rasuwa sits Gosaikunda, the lake Lord Shiva is said to have made by striking the mountain with his trident, searching for cool water after swallowing the poison from the churning of the ocean. The myth, the trek, and why it stays with me.',
    date: 'Jun 28, 2026',
  },
]

const MOOD_BOARD_IMAGES = [
  { image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=500&fit=crop&auto=format', alt: 'The morning routine I actually keep' },
  { image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&h=500&fit=crop&auto=format', alt: 'Going back to places instead of collecting new ones' },
  { image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=500&fit=crop&auto=format', alt: 'What I read when I cannot sleep' },
  { image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&h=500&fit=crop&auto=format', alt: 'Movement without the metrics' },
  { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=500&fit=crop&auto=format', alt: 'The case for a proper coffee break' },
  { image: 'https://images.unsplash.com/photo-1699847250423-9c148ed9d103?w=700&h=500&fit=crop&auto=format', alt: 'Keeping friendships alive across time zones' },
]

function Nav({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(250,247,242,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--color-charcoal)',
            letterSpacing: '-0.01em',
          }}
        >
          Anushka Shrestha
        </span>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: active === item.id ? 600 : 400,
                color: active === item.id ? 'var(--color-saffron)' : 'var(--color-muted-ink)',
                letterSpacing: '0.02em',
                padding: '0.25rem 0',
                borderBottom: active === item.id ? '1.5px solid var(--color-saffron)' : '1.5px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'var(--color-cream)',
        overflow: 'hidden',
      }}
    >
      {/* Left */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '6.5rem 4rem 3rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-saffron)',
            marginBottom: '1rem',
          }}
        >
          nush'S:
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 4vw, 4.25rem)',
            lineHeight: 1.05,
            color: 'var(--color-charcoal)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Stories,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--color-saffron)' }}>outfits</em>,<br />
          and home.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-muted-ink)',
            marginTop: '1.25rem',
            maxWidth: '28rem',
          }}
        >
          A corner of the internet where I share what I think, what I wear, and what makes a place feel like home.
        </p>
        <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0.6rem 1.25rem',
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted-ink)',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'var(--color-saffron)'
                el.style.borderColor = 'var(--color-saffron)'
                el.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'transparent'
                el.style.borderColor = 'var(--color-border)'
                el.style.color = 'var(--color-muted-ink)'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right — image with overlay */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1690908719413-35714e667847?w=900&h=1100&fit=crop&auto=format"
          alt="Krishna Mandir temple, Mangalbazar, Patan, Lalitpur"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(15%) contrast(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, var(--color-cream) 0%, transparent 25%), linear-gradient(to top, var(--color-cream) 0%, transparent 40%)',
          }}
        />
        {/* Decorative label */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            right: '2rem',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(232,132,74,0.7)',
          }}
        >
          Kathmandu → The World
        </div>
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
        backgroundColor: 'var(--color-warm-white)',
        padding: '7rem 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--color-charcoal)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            2 cents
          </h2>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TWO_CENTS_POSTS.map((post, i) => (
            <article
              key={post.no}
              onMouseEnter={() => setHovered(post.no)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '5rem 1fr auto',
                gap: '2rem',
                alignItems: 'start',
                padding: '2.5rem 0',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                backgroundColor: hovered === post.no ? 'rgba(232,132,74,0.04)' : 'transparent',
                transition: 'background-color 0.2s ease',
                marginLeft: '-1rem',
                marginRight: '-1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-saffron)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  paddingTop: '0.25rem',
                }}
              >
                {post.no}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                    lineHeight: 1.3,
                    color: 'var(--color-charcoal)',
                    letterSpacing: '-0.01em',
                    margin: '0 0 0.75rem',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--color-muted-ink)',
                    margin: 0,
                    maxWidth: '48rem',
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '0.5rem',
                  paddingTop: '0.25rem',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted-ink)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {post.date}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--color-border)',
                  }}
                >
                  {post.readTime}
                </span>
                <span
                  style={{
                    fontSize: '1rem',
                    color: hovered === post.no ? 'var(--color-saffron)' : 'var(--color-border)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  →
                </span>
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
        backgroundColor: 'var(--color-cream)',
        padding: '7rem 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--color-charcoal)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            m:)L ghar
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(232,132,74,0.6)',
                letterSpacing: '0.04em',
                fontStyle: 'normal',
                marginTop: '0.4rem',
              }}
            >
              घर — home
            </span>
          </h2>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {GHAR_POSTS.map((post, i) => (
            <article
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '0',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
                borderColor: hovered === i ? 'var(--color-saffron)' : 'var(--color-border)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  backgroundColor: '#d9d3cb',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: hovered === i ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                    filter: 'brightness(0.95)',
                  }}
                />
              </div>
              <div
                style={{
                  padding: '2.5rem 3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-warm-white)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-saffron)',
                      fontWeight: 600,
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'rgba(160,144,128,0.6)',
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                    lineHeight: 1.3,
                    color: 'var(--color-charcoal)',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--color-muted-ink)',
                    margin: '0 0 1.5rem',
                  }}
                >
                  {post.body}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: hovered === i ? 'var(--color-saffron)' : 'var(--color-border)',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s ease',
                  }}
                >
                  Read more →
                </span>
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

  return (
    <section
      id="mood-board"
      style={{
        backgroundColor: 'var(--color-warm-white)',
        padding: '7rem 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--color-charcoal)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            mood board
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
          }}
        >
          {MOOD_BOARD_IMAGES.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                aspectRatio: '7 / 5',
                overflow: 'hidden',
                backgroundColor: '#d9d3cb',
                border: '1px solid var(--color-border)',
                outline: hovered === i ? '2px solid var(--color-saffron)' : '2px solid transparent',
                outlineOffset: '4px',
                transition: 'outline-color 0.2s ease',
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.97)',
                }}
              />
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
    name: 'Instagram',
    path: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
  },
  {
    name: 'Pinterest',
    path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z',
  },
  {
    name: 'Lemon8',
    path: 'M3 21c-2.5-2.5-.6-9.3 4.2-14.1C12 2.1 18.8.2 21.3 2.7s.6 9.3-4.2 14.1C12.3 21.6 5.5 23.5 3 21ZM12.6 6.7a2.7 2.7 0 1 0 0 5.4a2.7 2.7 0 1 0 0-5.4ZM12.6 8a1.4 1.4 0 1 0 0 2.8a1.4 1.4 0 1 0 0-2.8ZM12.2 11.7a3.3 3.3 0 1 0 0 6.6a3.3 3.3 0 1 0 0-6.6ZM12.2 13.2a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 1 0 0-3.6Z',
    fillRule: 'evenodd' as const,
  },
  {
    name: 'TikTok',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

function Socials() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="socials"
      style={{
        backgroundColor: 'var(--color-warm-white)',
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-saffron)',
            margin: 0,
          }}
        >
          Socials
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SOCIALS.map((social) => (
            /* Placeholder — swap each span for <a href="..."> once the profile links exist. */
            <span
              key={social.name}
              role="img"
              aria-label={social.name}
              title={social.name}
              onMouseEnter={() => setHovered(social.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: hovered === social.name ? 'var(--color-saffron)' : 'var(--color-border)',
                backgroundColor: hovered === social.name ? 'var(--color-saffron)' : 'transparent',
                color: hovered === social.name ? 'var(--color-warm-white)' : 'var(--color-muted-ink)',
                transition: 'all 0.2s ease',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                fillRule={social.fillRule ?? 'nonzero'}
                aria-hidden="true"
                focusable="false"
              >
                <path d={social.path} />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-cream)',
        borderTop: '1px solid var(--color-border)',
        padding: '3rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--color-charcoal)',
            fontWeight: 400,
          }}
        >
          Anushka Shrestha
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-muted-ink)',
          }}
        >
          © 2026 · Made by love between anushka  rohan 
        </span>
      </div>
    </footer>
  )
}

function EmailPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(28,25,22,0.55)',
        backdropFilter: 'blur(4px)',
        animation: 'popup-fade 0.3s ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-popup-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '30rem',
          backgroundColor: 'var(--color-cream)',
          border: '2px solid var(--color-charcoal)',
          boxShadow: '10px 10px 0 var(--color-saffron)',
          padding: '3rem 2.5rem 2rem',
          transform: 'rotate(-1deg)',
          animation: 'popup-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Sticker */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-1.5rem',
            right: '-1.25rem',
            width: '5.5rem',
            height: '5.5rem',
            borderRadius: '50%',
            backgroundColor: 'var(--color-teal)',
            color: 'var(--color-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            lineHeight: 1.05,
            border: '2px solid var(--color-charcoal)',
            animation: 'popup-wiggle 2.4s ease-in-out infinite',
          }}
        >
          psst!
          <br />
          ✦
        </div>

        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            width: '2rem',
            height: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            lineHeight: 1,
            color: 'var(--color-muted-ink)',
          }}
        >
          ×
        </button>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-terracotta)',
            margin: '0 0 1rem',
          }}
        >
          नमस्ते, stranger :)
        </p>

        <h2
          id="email-popup-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-charcoal)',
            margin: 0,
          }}
        >
          Oi! Don't just{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-saffron)' }}>lurk</em>.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.975rem',
            lineHeight: 1.65,
            color: 'var(--color-muted-ink)',
            margin: '1rem 0 1.75rem',
          }}
        >
          Get my 2 cents, a peek inside m:)L ghar and whatever's pinned to the mood board, delivered
          straight to your inbox. No spam. Only chiya-fuelled rambles. ☕
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.cool"
            aria-label="Email address"
            style={{
              flex: '1 1 12rem',
              minWidth: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              padding: '0.8rem 1rem',
              backgroundColor: 'var(--color-warm-white)',
              color: 'var(--color-ink)',
              border: '2px solid var(--color-charcoal)',
              borderRadius: 0,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              flex: '0 0 auto',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.8rem 1.25rem',
              backgroundColor: 'var(--color-saffron)',
              color: 'var(--color-charcoal)',
              border: '2px solid var(--color-charcoal)',
              boxShadow: '4px 4px 0 var(--color-charcoal)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 var(--color-charcoal)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '4px 4px 0 var(--color-charcoal)'
            }}
          >
            Count me in →
          </button>
        </form>

        <button
          onClick={() => setOpen(false)}
          style={{
            display: 'block',
            margin: '1.5rem auto 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-muted-ink)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          nah, I'll keep lurking
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav active={activeSection} onNav={scrollTo} />
      <EmailPopup />
      <Hero />
      <MoodBoard />
      <Ghar />
      <TwoCents />
      <Socials />
      <Footer />
    </>
  )
}
