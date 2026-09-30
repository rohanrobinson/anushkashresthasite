import { useState } from "react"

import type { BlogPost } from "./blogPosts"

/* The post runs the same 1200px measure as the rest of the site rather than a
   narrow centred column: the mood board takes the full width, and the prose
   sits in a two-column row with its headings out in the left margin, so the
   page is used edge to edge instead of stacked down the middle. */
export default function BlogPage({
  post,
  onHome,
}: {
  post: BlogPost
  onHome: () => void
}) {
  const [backHovered, setBackHovered] = useState(false)
  const [lit, setLit] = useState<number | null>(null)

  const body: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "1.0625rem",
    lineHeight: 1.8,
    color: "var(--color-cream-dim)",
    margin: "0 0 1.25rem",
  }

  const railLabel: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.6875rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--color-saffron)",
    fontWeight: 600,
  }

  return (
    <article
      style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem 6rem" }}
    >
      <button
        onClick={onHome}
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "0.8125rem",
          letterSpacing: "0.04em",
          color: backHovered
            ? "var(--color-saffron)"
            : "var(--color-cream-dim)",
          transition: "color 0.2s ease",
        }}
      >
        ← back to everything else
      </button>

      {/* The piece's name out in the left rail and the record for it beside
          it, tops level, so the row reads as one header instead of leaving a
          hole above the player. The embed is the real Spotify player, so it
          handles its own preview / full-track logic depending on who is signed
          in. */}
      <div className="post-row post-head">
        <header style={{ minWidth: 0 }}>
          <h1
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "0.6rem",
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {post.devanagari && (
              <span
                lang="ne"
                style={{
                  fontFamily: "var(--font-devanagari)",
                  fontSize: "23px",
                  color: "var(--color-marigold)",
                }}
              >
                {post.devanagari}
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "30px",
                color: "var(--color-cream)",
              }}
            >
              {post.title}
            </span>
          </h1>
          <p style={{ ...railLabel, margin: "0.85rem 0 0" }}>{post.tag}</p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "rgba(255,218,194,0.65)",
              margin: "0.45rem 0 0",
            }}
          >
            {post.date} · {post.readTime}
          </p>
        </header>

        <section
          aria-label="Background music for this post"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "rgba(248,236,224,0.05)",
            padding: "1.25rem 1.25rem 1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--color-cream-dim)",
              margin: "0 0 1rem",
            }}
          >
            <strong style={{ color: "var(--color-cream)", fontWeight: 600 }}>
              {post.music.title}
            </strong>{" "}
            — {post.music.artist}. {post.music.note}
          </p>
          <iframe
            title={`${post.music.title} by ${post.music.artist} on Spotify`}
            src={`https://open.spotify.com/embed/track/${post.music.spotify}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            loading="lazy"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ border: 0, display: "block", borderRadius: 0 }}
          />
        </section>
      </div>

      <div className="post-row" style={{ marginTop: "3.5rem" }}>
        <div />
        <div className="post-prose">
          {post.intro.map((para, i) => (
            <p key={i} style={{ ...body, fontSize: "1.1875rem" }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {post.sections.map((section, i) => (
        <section key={i} className="post-row" style={{ marginTop: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "1.375rem",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "var(--color-cream)",
              margin: 0,
            }}
          >
            {section.heading}
          </h2>
          <div className="post-prose">
            {section.paragraphs.map((para, j) => (
              <p key={j} style={body}>
                {para}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section
        className="post-row"
        style={{
          marginTop: "4rem",
          paddingTop: "2.5rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <p style={{ ...railLabel, margin: 0 }}>For the record</p>
        <div className="post-prose">
          {post.outro.map((para, i) => (
            <p key={i} style={{ ...body, color: "var(--color-marigold)" }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Mood board for the post — full width, same lit-tile behaviour. */}
      <section style={{ marginTop: "4.5rem" }}>
        <h2 style={{ ...railLabel, margin: "0 0 1.5rem" }}>
          Mood board for this one
        </h2>
        <div className="post-mosaic">
          {post.moodBoard.map((item, i) => (
            <div
              key={i}
              className={`mood-tile${lit === i ? " is-lit" : ""}`}
              onMouseEnter={() => setLit(i)}
              onMouseLeave={() => setLit(null)}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                backgroundColor: "rgba(248,236,224,0.08)",
                transform:
                  lit === i
                    ? "scale(1.025) rotate(-1.1deg)"
                    : lit === null
                      ? "none"
                      : "scale(0.985)",
                filter: lit !== null && lit !== i ? "brightness(0.66)" : "none",
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
                  display: "block",
                  filter:
                    lit === i
                      ? "saturate(1.18) contrast(1.06) sepia(0.12)"
                      : "saturate(0.86) brightness(0.94)",
                  transform: lit === i ? "scale(1.03)" : "none",
                }}
              />
              <div
                className="mood-caption"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "1.4rem 0.85rem 0.75rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  lineHeight: 1.35,
                  color: "var(--color-cream)",
                  textShadow: "0 1px 6px rgba(28,8,6,0.9)",
                  background:
                    "linear-gradient(180deg, rgba(28,8,6,0) 0%, rgba(28,8,6,0.78) 60%, rgba(28,8,6,0.92) 100%)",
                  opacity: lit === i ? 1 : 0,
                  transform: lit === i ? "translateY(0)" : "translateY(0.5rem)",
                  pointerEvents: "none",
                }}
              >
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={onHome}
        style={{
          display: "block",
          margin: "4rem auto 0",
          background: "none",
          border: "1px solid var(--color-border)",
          padding: "0.8rem 1.5rem",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "0.8125rem",
          letterSpacing: "0.04em",
          color: "var(--color-cream)",
        }}
      >
        ← back to everything else
      </button>
    </article>
  )
}
