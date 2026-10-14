import { useEffect, useRef, useState, type ReactNode } from "react"

import useIsPhone from "./useIsPhone"

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
]
const numberWord = (n: number) => WORDS[n] ?? String(n)

/* One photo on the reel, shown whole at its own proportions. */
export type ReelItem = {
  image: string
  alt: string
  caption: string
  captionContent?: ReactNode
  credits?: { item: string; brand?: string; href?: string; phoneLink?: boolean }[]
}

/* The "reel" board: a horizontal, swipeable strip with depth. The card in
   the middle faces you, flat and full colour; the ones either side turn away
   in 3D and shrink the further they are from centre, all dimmed to the same
   shade so the one in front is the only one lit. Swipe on a phone,
   drag / trackpad / arrow keys / the buttons on a desktop, or click any card
   to bring it forward. The caption for the card in front sits under the
   reel, so nothing depends on hovering. */
export default function MoodReel({
  items,
  season,
}: {
  items: ReelItem[]
  season: string
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLButtonElement | null)[]>([])
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 })
  const [active, setActive] = useState(0)

  // A card's left edge in the scroller's own coordinates, whichever element
  // the browser happens to report its offset against.
  const leftOf = (card: HTMLElement) => {
    const el = scroller.current
    let x = card.offsetLeft
    let p = card.offsetParent as HTMLElement | null
    while (p && p !== el) {
      x += p.offsetLeft
      p = p.offsetParent as HTMLElement | null
    }
    return x
  }

  // Work out each card's distance from the middle on every scroll and
  // hand it to the CSS as --d (signed) and --ad (absolute), which drive the
  // turn, the scale and the dimming.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const update = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.current.forEach((card, i) => {
        if (!card) return
        const centre = leftOf(card) + card.offsetWidth / 2
        const dist = centre - mid
        const d = Math.max(-2, Math.min(2, dist / card.offsetWidth))
        const ad = Math.abs(d)
        card.style.setProperty("--d", d.toFixed(3))
        card.style.setProperty("--ad", Math.min(ad, 1.4).toFixed(3))
        card.style.zIndex = String(100 - Math.round(ad * 10))
        if (Math.abs(dist) < bestDist) {
          bestDist = Math.abs(dist)
          best = i
        }
      })
      setActive(best)
    }
    // Eleven cards is cheap enough to measure on every scroll event
    // directly, which keeps the turn locked to the finger with no frame lag.
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const goTo = (i: number) => {
    const el = scroller.current
    const card = cards.current[Math.max(0, Math.min(items.length - 1, i))]
    if (!el || !card) return
    el.scrollTo({
      left: leftOf(card) + card.offsetWidth / 2 - el.clientWidth / 2,
      behavior: "smooth",
    })
  }

  // Mouse drag to scroll on a desktop (touch already swipes natively). Snap
  // is switched off while dragging so the strip follows the hand, then back
  // on to settle a card in the middle.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scroller.current) return
    drag.current = {
      down: true,
      moved: false,
      x: e.clientX,
      left: scroller.current.scrollLeft,
    }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current
    if (!drag.current.down || !el) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 5 && !drag.current.moved) {
      drag.current.moved = true
      el.classList.add("is-dragging")
    }
    if (drag.current.moved) el.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => {
    if (!drag.current.down) return
    drag.current.down = false
    const el = scroller.current
    if (el && drag.current.moved) {
      el.classList.remove("is-dragging")
      goTo(active)
    }
  }

  const isPhone = useIsPhone()
  // On a phone the credits stay as plain text, bar the few marked phoneLink.
  const current: ReelItem = isPhone
    ? {
        ...items[active],
        credits: items[active].credits?.map((c) =>
          c.phoneLink ? c : { ...c, href: undefined },
        ),
      }
    : items[active]

  return (
    <div className="reel">
      <div
        ref={scroller}
        className="reel-scroller"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Mood board photos — swipe, drag or use the arrow keys"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            goTo(active + 1)
          } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            goTo(active - 1)
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="reel-track">
          {/* Opening card: fills the empty run before the first photo with
              the board's name and a nudge to start moving. Desktop only. */}
          <div className="reel-end reel-end--start" aria-hidden="true">
            <span className="reel-end-kicker">{season}</span>
            <p className="reel-end-title">
              {numberWord(items.length)} frames, one long summer
            </p>
            <span className="reel-end-hint">
              drag or swipe <span className="reel-end-arrow">→</span>
            </span>
          </div>

          {items.map((item, i) => (
            <button
              key={i}
              ref={(node) => {
                cards.current[i] = node
              }}
              type="button"
              className={`reel-card${i === active ? " is-active" : ""}`}
              aria-label={`${i + 1} of ${items.length}: ${item.alt}`}
              aria-current={i === active ? "true" : undefined}
              onClick={(e) => {
                if (drag.current.moved) {
                  e.preventDefault()
                  drag.current.moved = false
                  return
                }
                goTo(i)
              }}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}

          {/* Closing card: fills the run after the last photo and sends the
              reader back to the start (or on to older boards). */}
          <div className="reel-end reel-end--finish">
            <span className="reel-end-kicker">fin.</span>
            <p className="reel-end-title">that&rsquo;s the summer.</p>
            {/* Placeholder — swap for <a href="..."> once older boards have
                a page, same as the header link. */}
            <span className="reel-end-link">moodier boards →</span>
            <button
              type="button"
              className="reel-end-back"
              onClick={() => goTo(0)}
            >
              ↺ back to the start
            </button>
          </div>
        </div>
      </div>

      {/* What is in front: number, caption and credits, plus the steppers. */}
      <div className="reel-caption" aria-live="polite">
        <button
          type="button"
          className="reel-step"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous photo"
        >
          ←
        </button>
        <div className="reel-caption-text">
          <span className="reel-count">
            {String(active + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(items.length).padStart(2, "0")}
          </span>
          <p className="reel-line">{current.captionContent ?? current.caption}</p>
          {current.credits ? (
            <div className="reel-credits">
              {current.credits.map((c) => (
                <span key={c.item} className="reel-credit">
                  {/* With no brand to carry the link, the item does. */}
                  {c.href && !c.brand ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer">
                      {c.item}
                    </a>
                  ) : (
                    c.item
                  )}
                  {c.brand ? (
                    <b>
                      {" "}
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer">
                          {c.brand}
                        </a>
                      ) : (
                        c.brand
                      )}
                    </b>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="reel-step"
          onClick={() => goTo(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next photo"
        >
          →
        </button>
      </div>

      {/* Progress: one tick per photo, the current one lit. */}
      <div className="reel-progress" aria-hidden="true">
        {items.map((_, i) => (
          <span key={i} className={i === active ? "is-on" : undefined} />
        ))}
      </div>
    </div>
  )
}
