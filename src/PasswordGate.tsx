import { useState, useEffect, type ReactNode } from "react"

/* A front door. Nothing behind it renders — not the nav, not the hero footage,
   not the email popup — until the right phrase is typed.

   Worth being honest about what this is: the site is static files, so the
   password and every page it guards are both shipped to the browser. Anyone
   who opens devtools can read the phrase out of the bundle. This keeps the
   site off the open web for a casual visitor or a search crawler; it is not a
   lock on anything that would matter if it were read. */
const PASSWORD = "5356metersNEPAL"

/* Remembered per browser, so a return visit on the same machine walks
   straight in. Swap `localStorage` for `sessionStorage` below to ask again
   every time the tab is closed. */
const STORAGE_KEY = "anushka-site-unlocked"

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    /* Private windows and blocked site data both throw here rather than
       returning empty, so a failed read just means "ask for the password". */
    try {
      return localStorage.getItem(STORAGE_KEY) === "yes"
    } catch {
      return false
    }
  })
  const [entry, setEntry] = useState("")
  const [wrong, setWrong] = useState(false)

  /* No scrolling the locked page. */
  useEffect(() => {
    if (unlocked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [unlocked])

  if (unlocked) return <>{children}</>

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    /* Case-sensitive on purpose: a plain === , no trimming, no lowercasing. */
    if (entry === PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, "yes")
      } catch {
        /* Can't remember it — fine, they're still in for this visit. */
      }
      setUnlocked(true)
      return
    }
    setWrong(true)
    setEntry("")
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "var(--color-earth)",
        backgroundImage:
          "linear-gradient(to bottom, var(--color-ember) 0%, var(--color-crimson) 55%, var(--color-earth) 100%)",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: "26rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-devanagari)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-saffron)",
            margin: "0 0 1rem",
          }}
        >
          ढोका बन्द छ
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 8vw, 3rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-cream)",
            margin: "0 0 0.75rem",
          }}
        >
          This one's{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-marigold)" }}>
            private
          </em>
          .
        </h1>

        <label
          htmlFor="site-password"
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "var(--color-cream-dim)",
            margin: "0 0 1.75rem",
          }}
        >
          Say the password and come in.
        </label>

        <input
          id="site-password"
          type="password"
          value={entry}
          autoFocus
          autoComplete="current-password"
          aria-invalid={wrong}
          aria-describedby={wrong ? "site-password-error" : undefined}
          onChange={(event) => {
            setEntry(event.target.value)
            setWrong(false)
          }}
          style={{
            width: "100%",
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            letterSpacing: "0.08em",
            textAlign: "center",
            color: "var(--color-paper-ink)",
            backgroundColor: "var(--color-paper)",
            border: `2px solid ${wrong ? "var(--color-terracotta)" : "var(--color-paper-ink)"}`,
            padding: "0.85rem 1rem",
            outline: "none",
          }}
        />

        {/* Holds its line whether or not there's a message, so the button
            doesn't jump when a wrong answer comes back. */}
        <p
          id="site-password-error"
          role="status"
          style={{
            minHeight: "1.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--color-marigold)",
            margin: "0.75rem 0 0",
          }}
        >
          {wrong ? "Not it. Mind the capitals." : ""}
        </p>

        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-paper-ink)",
            backgroundColor: "var(--color-saffron)",
            border: "2px solid var(--color-paper-ink)",
            boxShadow: "5px 5px 0 var(--color-earth)",
            padding: "0.8rem 2rem",
            cursor: "pointer",
          }}
        >
          भित्र आउनु
        </button>
      </form>
    </div>
  )
}
