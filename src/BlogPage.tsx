import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

import type { BlogPost, BlogSection } from "./blogPosts"
import useIsPhone from "./useIsPhone"

/* Prose seen through a window a few lines tall. The round button under it
   sets the text drifting up at a reading pace and pauses it again; once the
   end is in view it turns round and takes the reader back to the top.
   Scrolling or swiping the window by hand works too, and stops the drift so
   the two never fight. */
function ScrollWindow({
  lines,
  wordsPerMinute,
  children,
}: NonNullable<BlogSection["scrollWindow"]> & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<"idle" | "playing" | "end">("idle")
  const [atTop, setAtTop] = useState(true)
  // A short section can fit the window whole on a wide screen; then there
  // is nothing to scroll, so no button and no fade.
  const [fits, setFits] = useState(false)

  useEffect(() => {
    const el = ref.current!
    const check = () => setFits(el.scrollHeight <= el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    observer.observe(el.firstElementChild!)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (state !== "playing") return
    const el = ref.current!
    // Pixels per word from the text's own height, so the pace holds in a
    // column of any width.
    const words = (el.textContent ?? "").trim().split(/\s+/).length || 1
    const pxPerSecond = (el.scrollHeight / words) * (wordsPerMinute / 60)
    // Kept as a float: scrollTop rounds, and at this speed a frame's step
    // is well under a pixel.
    let pos = el.scrollTop
    let last = performance.now()
    let raf = requestAnimationFrame(function tick(now) {
      pos += ((now - last) / 1000) * pxPerSecond
      last = now
      const max = el.scrollHeight - el.clientHeight
      if (pos >= max) {
        el.scrollTop = max
        setState("end")
        return
      }
      el.scrollTop = pos
      raf = requestAnimationFrame(tick)
    })
    const stop = () => setState("idle")
    el.addEventListener("wheel", stop, { passive: true })
    el.addEventListener("touchstart", stop, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("wheel", stop)
      el.removeEventListener("touchstart", stop)
    }
  }, [state, wordsPerMinute])

  const onScroll = () => {
    const el = ref.current!
    setAtTop(el.scrollTop <= 1)
    if (state === "playing") return
    const atEnd = el.scrollTop >= el.scrollHeight - el.clientHeight - 1
    setState(atEnd ? "end" : "idle")
  }

  const onClick = () => {
    if (state === "playing") return setState("idle")
    if (state === "end") {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
      ref.current!.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
      return setState("idle")
    }
    setState("playing")
  }

  return (
    <>
      <div
        ref={ref}
        className={`post-reel${atTop ? "" : " is-scrolled"}${
          state === "end" ? " is-end" : ""
        }${fits ? " is-whole" : ""}`}
        style={{ "--reel-lines": lines } as React.CSSProperties}
        onScroll={onScroll}
        tabIndex={fits ? undefined : 0}
      >
        {children}
      </div>
      {!fits && (
        <button
          type="button"
          className={`post-reel-button is-${state}`}
          onClick={onClick}
          aria-label={
            state === "playing"
              ? "Pause the text"
              : state === "end"
                ? "Back to the top of the text"
                : "Scroll the text"
          }
        >
          {state === "playing" ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M5 3.5v9M11 3.5v9" />
            </svg>
          ) : (
            /* Double chevron, pointing down; turned to point up at the end. */
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 3.5 8 7.5l4-4M4 8.5l4 4 4-4" />
            </svg>
          )}
        </button>
      )}
    </>
  )
}

/* A section's button out to a fuller page. Until that page exists there is
   no href: a click pops a small "coming soon" over the button instead of
   going anywhere, and it clears itself after a moment. */
function PostCta({ label, href }: NonNullable<BlogSection["cta"]>) {
  const [soon, setSoon] = useState(false)

  useEffect(() => {
    if (!soon) return
    const t = window.setTimeout(() => setSoon(false), 2200)
    return () => window.clearTimeout(t)
  }, [soon])

  if (href) {
    return (
      <a
        className="post-cta"
        href={href}
        {...(/^https?:/.test(href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
      </a>
    )
  }

  return (
    <span className="post-cta-anchor">
      <button type="button" className="post-cta" onClick={() => setSoon(true)}>
        {label}
      </button>
      <span className="post-cta-pop" role="status">
        {soon ? "coming soon" : ""}
      </span>
    </span>
  )
}

/* The sections folded into one list: a row per section, its heading and
   caption with a caret at the end. A row opens that section's full text in
   a panel laid over the list, in the same spot, on the section's photo
   under a dark wash; the triangle at its foot (or Escape) closes it and
   hands the reader back to the row they opened. The list and the panel
   share one grid cell, so the block is as tall as whichever is taller and
   nothing below it jumps. */
function SectionContents({
  sections,
  body,
  open,
  setOpen,
  /* Which section is open, kept by the page so the rest of it can
     answer to it. */
}: {
  sections: BlogSection[]
  body: React.CSSProperties
  open: number | null
  setOpen: (i: number | null) => void
}) {
  const wrap = useRef<HTMLElement>(null)
  const panelHeading = useRef<HTMLHeadingElement>(null)
  const rows = useRef<(HTMLButtonElement | null)[]>([])
  const last = useRef<number | null>(null)
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    if (open === null) {
      // Back to the row that was opened, scrolled to only if it's out of
      // view.
      const row = last.current === null ? null : rows.current[last.current]
      if (row) {
        row.focus({ preventScroll: true })
        row.scrollIntoView({ block: "nearest", behavior: "auto" })
      }
      return
    }
    last.current = open
    panelHeading.current?.focus({ preventScroll: true })
    // Opened from low in the list, the panel's top is above the screen;
    // bring it down to just under the site's fixed header.
    const top = wrap.current!.getBoundingClientRect().top
    if (top < 80) {
      wrap.current!.scrollIntoView({
        block: "start",
        behavior: smooth ? "smooth" : "auto",
      })
    }
  }, [open, smooth])

  const section = open === null ? null : sections[open]
  // Every grid photo as { src, caption?, position?, whole?, ... }.
  const grid = section?.panelGrid?.map((cell) =>
    typeof cell === "string" ? { src: cell } : cell,
  )
  // A photo's loop plays while it is hovered, on a screen that hovers and
  // only without reduced motion; it fades in once it is really playing and
  // starts from the top each time.
  const playCellVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const ok = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches
    const video = e.currentTarget.querySelector("video")
    if (ok && video) video.play().catch(() => {})
  }
  const stopCellVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video")
    if (!video) return
    video.pause()
    video.currentTime = 0
    video.classList.remove("is-playing")
  }
  // Six for a phone: the month's own list, or the top and bottom rows of
  // the nine.
  const phoneGrid =
    section?.panelGridPhone ??
    grid
      ?.filter((_, k) => [0, 1, 2, 6, 7, 8].includes(k))
      .map((cell) => cell.src)

  return (
    <section
      ref={wrap}
      id="post-months"
      className={`post-contents${section ? " is-open" : ""}`}
      aria-label="The months"
    >
      <ol className="post-contents-list" inert={section ? true : undefined}>
        {sections.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              ref={(el) => {
                rows.current[i] = el
              }}
              className="post-contents-row"
              aria-expanded={open === i}
              aria-controls="post-contents-panel"
              onClick={() => setOpen(i)}
            >
              <span className="post-contents-name">{s.heading}</span>
              <span className="post-contents-caption">{s.image?.caption}</span>
              {s.season && (
                <span className="post-contents-season">
                  {s.season.en}: <span lang="ne">{s.season.ne}</span>
                </span>
              )}
              <svg
                className="post-contents-caret"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M3.5 6 8 10.5 12.5 6" />
              </svg>
            </button>
          </li>
        ))}
      </ol>

      {section && (
        <div
          id="post-contents-panel"
          className={`post-contents-panel${
            section.panelGrid ? " has-grid" : ""
          }`}
          role="region"
          aria-labelledby="post-contents-panel-heading"
          style={
            section.image && !section.panelGrid
              ? {
                  "--band-image": `url(${section.image.src})`,
                  "--band-position": section.image.position ?? "center",
                } as React.CSSProperties
              : undefined
          }
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(null)
          }}
        >
          {/* Nine photos behind the text in place of the one, when the
              month has them: each one a cell of the panel's own 3 x 3
              grid, so the text's row of photos grows with the text. */}
          {grid
            ?.slice(0, 9)
            .map(
              (
                { src, caption, captionTopRight, position, whole, video },
                k,
              ) => (
                <div
                  key={k}
                  className={`post-contents-cell post-contents-cell--wide post-contents-cell--row${
                    Math.floor(k / 3) + 1
                  }`}
                  onMouseEnter={video ? playCellVideo : undefined}
                  onMouseLeave={video ? stopCellVideo : undefined}
                  style={
                    {
                      gridRow: Math.floor(k / 3) + 1,
                      gridColumn: (k % 3) + 1,
                      // Row and column from 0, for the phone layout.
                      "--r": Math.floor(k / 3),
                      "--c": k % 3,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                >
                  {whole && (
                    <img
                      className="post-contents-cell-fill"
                      src={src}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    style={{
                      objectPosition: position,
                      objectFit: whole ? "contain" : undefined,
                    }}
                  />
                  {video && (
                    <video
                      className="post-contents-cell-video"
                      src={video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{ objectPosition: position }}
                      onPlaying={(e) =>
                        e.currentTarget.classList.add("is-playing")
                      }
                    />
                  )}
                  {caption && (
                    <span
                      className={`post-contents-sticker${
                        captionTopRight
                          ? " post-contents-sticker--top-right"
                          : ""
                      }`}
                    >
                      {caption}
                    </span>
                  )}
                </div>
              ),
            )}
          {/* A phone's own set, 3 rows of 2. Lazy, so whichever set is
              hidden on this screen never loads. */}
          {phoneGrid?.slice(0, 6).map((src, k) => (
            <div
              key={k}
              className="post-contents-cell post-contents-cell--phone"
              style={
                {
                  "--r": Math.floor(k / 2),
                  "--c": k % 2,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              {/* Framed the same way as on a wide screen. */}
              <img
                src={src}
                alt=""
                loading="lazy"
                style={{
                  objectPosition: grid?.find((cell) => cell.src === src)
                    ?.position,
                }}
              />
            </div>
          ))}
          {section.image && (
            <span className="sr-only">Photo: {section.image.alt}</span>
          )}
          <div className="post-contents-head">
            <h2
              id="post-contents-panel-heading"
              ref={panelHeading}
              tabIndex={-1}
              className="post-section-title"
            >
              {section.heading}
            </h2>
          </div>
          <div className="post-prose post-contents-text">
            {section.paragraphs.map((para, j) => (
              <p key={j} style={body}>
                {para}
              </p>
            ))}
            {section.cta && (
              <div className="post-contents-cta">
                <PostCta {...section.cta} />
              </div>
            )}
          </div>
          <button
            type="button"
            className="post-contents-close"
            onClick={() => setOpen(null)}
            aria-label="Close and go back to the months"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 3.5 13.5 12.5h-11Z" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

/* The post runs the same 1200px measure as the rest of the site rather than a
   narrow centred column: the mood board takes the full width, and the prose
   sits in a two-column row with its headings out in the left margin, so the
   page is used edge to edge instead of stacked down the middle. */
export default function BlogPage({ post }: { post: BlogPost }) {
  const [lit, setLit] = useState<number | null>(null)
  // The open section of a "contents" post, if any.
  const [openSection, setOpenSection] = useState<number | null>(null)
  /* With a section open the closing note waits until the reader is back
     at the list, or has opened the last section, which they would reach
     next anyway. The mood board under it shows either way. */
  /* On a phone a calendar post ends board first: the months, the mood
     board, and only then the closing note, which is the last thing on the
     page and shows only with every month closed. */
  const isPhone = useIsPhone()
  const noteLast = isPhone && post.sectionsLayout === "contents"
  const showEnding =
    post.sectionsLayout !== "contents" ||
    openSection === null ||
    (!noteLast && openSection === post.sections.length - 1)
  /* On a calendar post each mood board tile stands for the month in the
     same place in the list, and opening the tile opens that month. The
     two lists run in the same order, Kartik round to Ashwin. */
  const tileOpens = (i: number) =>
    post.sectionsLayout === "contents" &&
    post.moodBoard.length === post.sections.length &&
    Boolean(post.moodBoard[i].month)
  const openFromTile = (i: number) => {
    if (openSection === i) {
      // Already open: the panel is where it was, so just go back up to it.
      document
        .getElementById("post-months")
        ?.scrollIntoView({ block: "start", behavior: "smooth" })
    } else {
      setOpenSection(i)
    }
  }
  // A touch screen has no hover: the first tap shows the month (colour,
  // Devanagari, caption) and a second tap on the same tile opens it. A
  // tap also fires a mouseenter just before the click, so the tile is
  // already lit by then; which tile was tapped last is kept apart.
  const noHover = window.matchMedia("(hover: none)").matches
  const tapped = useRef<number | null>(null)
  const square = post.moodBoardLayout === "square"
  const carousel = post.moodBoardCarousel === true
  // Which photo the phone carousel is centred on, for the "3 / 15" count.
  const [slide, setSlide] = useState(0)

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

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches

  /* One play of the opening clip. Every copy on the page is muted, looped
     and silent to screen readers; the band names the footage once. */
  const clipVideo = (className: string, key?: string) => (
    <video
      key={key}
      className={className}
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      poster={post.introVideo!.poster}
      aria-hidden="true"
      // There is no attribute for speed, and loading resets it, so set it
      // once the clip is ready.
      onLoadedMetadata={(e) => {
        const rate = post.introVideo!.playbackRate ?? 1
        e.currentTarget.defaultPlaybackRate = rate
        e.currentTarget.playbackRate = rate
      }}
    >
      <source src={post.introVideo!.src} type="video/mp4" />
    </video>
  )
  const clipInHead = post.introVideo?.frameSide === "center"

  const intro = (
    <div className="post-row post-intro">
      <div />
      <div className="post-prose">
        {post.intro.map((para, i) => (
          <p key={i} style={{ ...body, fontSize: "1.1875rem" }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )

  const head = (
    <>
      {/* The piece's name out in the left rail and the record for it beside
          it, tops level, so the row reads as one header instead of leaving a
          hole above the record. */}
      <div className="post-row post-head">
        <header style={{ minWidth: 0 }}>
          <h1
            className="post-title-stack"
            style={{
              display: "flex",
              flexDirection: "column",
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
              color: "rgba(var(--cream-dim-rgb), 0.65)",
              margin: "0.45rem 0 0",
            }}
          >
            {post.readTime}
          </p>
        </header>

        {/* The sharp copy of the opening clip, between the title and the
            record, when the post asks for it there. Wide screens only. */}
        {clipInHead && (
          <div className="post-head-clip">
            {clipVideo("post-head-clip-video")}
          </div>
        )}

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
              ? {
                  "--music-image": `url(${post.music.backdrop})`,
                } as React.CSSProperties
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
              <span className="post-music-label-rest">
                Listen while you read
              </span>
              <span className="post-music-tip" aria-hidden="true">
                YouTube Premium: divine moments deserve uninterrupted listening
                😉
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
    </>
  )

  /* The closing note, set before the mood board, or after it on a
     calendar post read on a phone (see noteLast). */
  const note = (
    <div className="post-row" hidden={!showEnding}>
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
          <p key={i} style={{ ...body, color: "var(--color-quiet)" }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )

  return (
    <article
      data-post={post.slug}
      style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem 6rem" }}
    >
      {post.introVideo ? (
        /* The header and the intro share one band with the footage running
           behind both, so it reads as a single moving opening. A reader who
           asks for less motion gets the poster. */
        <section
          className={`post-band post-band--top${
            post.introVideo.seeThrough ? " post-band--see-through" : ""
          }${
            post.introVideo.frameSide === "right"
              ? " post-band--frame-right"
              : ""
          }${clipInHead ? " post-band--frame-center" : ""}`}
          style={
            post.introVideo.framePosition
              ? {
                  "--frame-position": post.introVideo.framePosition,
                } as React.CSSProperties
              : undefined
          }
        >
          {/* Two plays of the same clip: a blurred one filling the band, and
              on a wide screen a sharp one framed on the subject in the open
              left of the band. */}
          {/* With the clip in the head row, the band keeps only the
              blurred copy. */}
          {(clipInHead ? ["fill"] : ["fill", "frame"]).map((layer) =>
            clipVideo(`post-band-video post-band-video--${layer}`, layer),
          )}
          <span className="sr-only">Video: {post.introVideo.alt}</span>
          <div className="post-band-inner">
            {head}
            <div style={{ marginTop: "2rem" }}>{intro}</div>
          </div>
        </section>
      ) : (
        <>
          {head}
          <div style={{ marginTop: "2rem" }}>{intro}</div>
        </>
      )}

      {post.sectionsLayout === "contents" ? (
        <SectionContents
          sections={post.sections}
          body={body}
          open={openSection}
          setOpen={setOpenSection}
        />
      ) : (
        post.sections.map((section, i) => {
          const heading = (
            <>
              <h2 className="post-section-title">{section.heading}</h2>
              {section.image?.caption && (
                <p className="post-band-caption">{section.image.caption}</p>
              )}
            </>
          )
          const paragraphs = section.paragraphs.map((para, j) => (
            <p key={j} style={body}>
              {para}
            </p>
          ))

          /* Three panels, each over its own photo, split by hairlines: the
             heading on the left, the prose in the middle, the button on the
             right. */
          if (section.image && section.sideImages) {
            const [left, right] = section.sideImages
            const photo = (img: { src: string; position?: string }) =>
              ({
                "--band-image": `url(${img.src})`,
                "--band-position": img.position ?? "center",
              }) as React.CSSProperties
            return (
              <section key={i} className="post-band post-tri">
                <span className="sr-only">
                  Photos: {left.alt}; {section.image.alt}; {right.alt}
                </span>
                <div
                  className="post-tri-panel post-tri-side"
                  style={photo(left)}
                >
                  {heading}
                </div>
                <div
                  className="post-tri-panel post-tri-main"
                  style={photo(section.image)}
                >
                  {section.scrollWindow ? (
                    <ScrollWindow {...section.scrollWindow}>
                      {/* The gap between paragraphs is exactly one line, so
                          every line lands whole in the window and its edge
                          never slices one. None after the last, so the
                          window stops on the text's last line. */}
                      <div className="post-prose">
                        {section.paragraphs.map((para, j, all) => (
                          <p
                            key={j}
                            style={{
                              ...body,
                              margin: j === all.length - 1 ? 0 : "0 0 1lh",
                            }}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </ScrollWindow>
                  ) : (
                    <div className="post-prose">{paragraphs}</div>
                  )}
                </div>
                <div
                  className="post-tri-panel post-tri-side post-tri-side--end"
                  style={photo(right)}
                >
                  {section.cta && <PostCta {...section.cta} />}
                </div>
              </section>
            )
          }

          const row = (
            <div className="post-row">
              <div style={{ minWidth: 0 }}>{heading}</div>
              <div className="post-prose">
                {paragraphs}
                {section.cta && (
                  <div className="post-cta-slot">
                    <PostCta {...section.cta} />
                  </div>
                )}
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
        })
      )}

      {/* The end of the post: the closing note, then a hairline, then the
          mood board under its own label, all kept close so it reads as one
          ending (on a phone, a calendar post puts the note last; see
          noteLast). While a section is open the closing note steps out (see
          showEnding); the mood board stays whatever is open. */}
      <section style={{ marginTop: "3rem" }}>
        {!noteLast && note}
        {/* The board's label on the left and the publish date across from
            it, sharing the hairline. One row on every phone (see
            .post-mood-head), so children size in em off the row. */}
        <div className="post-mood-head phone-fit" data-post={post.slug}>
          <h3 style={{ ...railLabel, fontSize: "0.6875em", margin: 0 }}>
            {post.moodBoardTitle ?? "Mood board for this one"}
          </h3>
          <p style={{ ...railLabel, fontSize: "0.6875em", margin: 0 }}>
            {post.date}
          </p>
        </div>
        <div
          className={[
            "post-mosaic",
            square && "post-mosaic--square",
            post.moodBoardLayout === "gallery" && "post-mosaic--gallery",
            carousel && "post-mosaic--carousel",
            post.moodBoard.some((item) => item.month) &&
              "post-mosaic--calendar",
          ]
            .filter(Boolean)
            .join(" ")}
          onScroll={
            carousel
              ? (e) => {
                  // Tiles snap to the centre and the padding lets the first
                  // and last centre too, so scroll position maps evenly to
                  // the photo index.
                  const el = e.currentTarget
                  const max = el.scrollWidth - el.clientWidth
                  if (max <= 0) return
                  setSlide(
                    Math.round(
                      (el.scrollLeft / max) * (post.moodBoard.length - 1),
                    ),
                  )
                }
              : undefined
          }
          style={
            post.moodBoardColumns
              ? { "--cols": post.moodBoardColumns } as React.CSSProperties
              : undefined
          }
        >
          {post.moodBoard.map((item, i) => (
            <div
              key={i}
              className={`mood-tile${lit === i ? " is-lit" : ""}`}
              onMouseEnter={() => setLit(i)}
              onMouseLeave={() => setLit(null)}
              {...(tileOpens(i)
                ? {
                    role: "button",
                    tabIndex: 0,
                    "aria-label": `${item.alt}. Open ${item.month!.en}`,
                    onClick: () => {
                      if (noHover && tapped.current !== i) {
                        tapped.current = i
                        setLit(i)
                        return
                      }
                      tapped.current = null
                      openFromTile(i)
                    },
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openFromTile(i)
                      }
                    },
                    onFocus: () => setLit(i),
                    onBlur: () => setLit(null),
                  }
                : {})}
              style={{
                cursor: tileOpens(i) ? "pointer" : undefined,
                position: "relative",
                height: "100%",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                backgroundColor: "rgba(var(--tint), 0.08)",
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
                  objectPosition: item.position,
                  display: "block",
                }}
              />
              {item.month && (
                <span className="post-mosaic-month">
                  <span className="post-mosaic-month-en">{item.month.en}</span>
                  <span className="post-mosaic-month-ne" lang="ne">
                    {item.month.ne}
                  </span>
                </span>
              )}
              {(item.captionContent ?? item.caption) && (
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
                    textShadow: "0 1px 6px rgba(var(--shade), 0.9)",
                    background:
                      "linear-gradient(180deg, rgba(var(--shade), 0) 0%, rgba(var(--shade), 0.78) 60%, rgba(var(--shade), 0.92) 100%)",
                    opacity: lit === i ? 1 : 0,
                    transform:
                      lit === i ? "translateY(0)" : "translateY(0.5rem)",
                    pointerEvents: lit === i ? "auto" : "none",
                  }}
                >
                  {item.captionContent ?? item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
        {carousel && (
          <p
            className="post-carousel-count"
            aria-hidden="true"
            style={railLabel}
          >
            swipe · {slide + 1} / {post.moodBoard.length}
          </p>
        )}
        {noteLast && <div style={{ marginTop: "3rem" }}>{note}</div>}
      </section>
    </article>
  )
}
