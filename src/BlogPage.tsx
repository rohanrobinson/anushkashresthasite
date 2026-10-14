import { useState } from "react"

import type { BlogPost } from "./blogPosts"

/* The post runs the same 1200px measure as the rest of the site rather than a
   narrow centred column: the mood board takes the full width, and the prose
   sits in a two-column row with its headings out in the left margin, so the
   page is used edge to edge instead of stacked down the middle. */
export default function BlogPage({ post }: { post: BlogPost }) {
  const [lit, setLit] = useState<number | null>(null)
  const square = post.moodBoardLayout === "square"

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
      {/* The piece's name out in the left rail and the record for it beside
          it, tops level, so the row reads as one header instead of leaving a
          hole above the record. */}
      <div className="post-row post-head">
        <header style={{ minWidth: 0 }}>
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.2rem",
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
            {post.readTime}
          </p>
        </header>

        {/* No in-page player, just a link out to the song on YouTube. It plays
            in full for anyone, signed in or not, and in the browser on desktop
            (Spotify links kept handing visitors to the Spotify app). */}
        {/* The whole card is the link, so the click target is the full strip
            rather than a small word at the end of it. */}
        <a
          className={
            post.music.backdrop ? "post-music post-music--photo" : "post-music"
          }
          style={
            post.music.backdrop
              ? ({
                  "--music-image": `url(${post.music.backdrop})`,
                } as React.CSSProperties)
              : undefined
          }
          href={`https://www.youtube.com/watch?v=${post.music.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play ${post.music.title} by ${post.music.artist} on YouTube (opens in a new tab)`}
        >
          <span style={{ minWidth: 0, flex: 1 }}>
            <span className="post-music-label">
              <span className="post-music-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="post-music-label-rest">Listen while you read</span>
              <span className="post-music-tip" aria-hidden="true">
                YouTube Premium: divine moments deserve uninterrupted listening 😉
              </span>
            </span>
            <span className="post-music-line">
              <strong style={{ color: "var(--color-cream)", fontWeight: 600 }}>
                {post.music.title}
              </strong>{" "}
              — {!post.music.hideArtist && <>{post.music.artist}. </>}
              {post.music.note}
            </span>
          </span>
          <span className="post-music-play" aria-hidden="true">
            {/* YouTube's own play button: red rounded tile, white triangle. */}
            <svg viewBox="0 0 28 20" width="100%" height="100%">
              <path
                d="M27.4 3.1A3.5 3.5 0 0 0 24.9.6C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 10 0 10s0 4.7.6 6.9a3.5 3.5 0 0 0 2.5 2.5C5.3 20 14 20 14 20s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5C28 14.7 28 10 28 10s0-4.7-.6-6.9Z"
                fill="#FF0000"
              />
              <path d="M11.2 14.3 18.5 10l-7.3-4.3v8.6Z" fill="#fff" />
            </svg>
          </span>
        </a>
      </div>

      <div className="post-row" style={{ marginTop: "2rem" }}>
        <div />
        <div className="post-prose">
          {post.intro.map((para, i) => (
            <p key={i} style={{ ...body, fontSize: "1.1875rem" }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {post.sections.map((section, i) => {
        const row = (
          <div className="post-row">
            <div style={{ minWidth: 0 }}>
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
              {section.image?.caption && (
                <p className="post-band-caption">{section.image.caption}</p>
              )}
            </div>
            <div className="post-prose">
              {section.paragraphs.map((para, j) => (
                <p key={j} style={body}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )

        /* A section with a photo becomes a full-width band with the photo
           under a scrim, the way Socials sits on the home page. The band's
           height comes from the text alone, so every section breathes the
           same amount whatever shape its picture is. */
        return section.image ? (
          <section
            key={i}
            className="post-band"
            style={
              {
                "--band-image": `url(${section.image.src})`,
                "--band-position": section.image.position ?? "center",
              } as React.CSSProperties
            }
          >
            <span className="sr-only">Photo: {section.image.alt}</span>
            <div className="post-band-inner">{row}</div>
          </section>
        ) : (
          <section key={i} style={{ marginTop: "3.5rem" }}>
            {row}
          </section>
        )
      })}

      {/* The end of the post: the closing note, then a hairline, then the
          mood board under its own label, all kept close so it reads as one
          ending. */}
      <section style={{ marginTop: "3rem" }}>
        <div className="post-row">
          {/* Dropped so the small label centres on the first line of the
              note beside it (1.0625rem text at 1.8 line height) instead of
              riding above it. */}
          <h2
            style={{
              ...railLabel,
              margin: 0,
              lineHeight: 1.2,
              paddingTop: "0.55rem",
            }}
          >
            For the record
          </h2>
          <div className="post-prose">
            {post.outro.map((para, i) => (
              <p key={i} style={{ ...body, color: "var(--color-marigold)" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
        <h3
          style={{
            ...railLabel,
            margin: "0.75rem 0 0.9rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {post.moodBoardTitle ?? "Mood board for this one"}
        </h3>
        <div
          className={square ? "post-mosaic post-mosaic--square" : "post-mosaic"}
          style={
            post.moodBoardColumns
              ? ({ "--cols": post.moodBoardColumns } as React.CSSProperties)
              : undefined
          }
        >
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
                    ? "scale(1.025)"
                    : lit === null
                      ? "none"
                      : "scale(0.985)",
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

    </article>
  )
}
