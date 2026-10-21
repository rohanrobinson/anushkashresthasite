/* Renders the site at every common phone width and checks that each
   .phone-fit block (or any selector passed with --select) reads the same as
   it does on the 430px reference phone: same number of lines, nothing past
   the screen edge, no sideways page scroll. Saves a screenshot of each block
   at the narrowest and the reference width to compare by eye.

   Needs puppeteer-core and a local Chrome. Run it from a scratch folder:

     npm i --prefix <scratch> puppeteer-core@23
     cp check-phones.mjs <scratch>/ && cd <scratch>
     node check-phones.mjs [--url http://localhost:8443] [--hash "#/blog/mool-ghar"]
                           [--select ".mood-blurb, footer"] [--out <dir>]

   Exit code 1 if any block breaks at any width. */
import puppeteer from "puppeteer-core"

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : fallback
}
const base = arg("url", "http://localhost:8443")
const hashes = (arg("hash", "#/") || "#/").split(",")
const selector = arg("select", ".phone-fit")
const out = arg("out", ".")
const chrome =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

/* iPhone SE 1st gen / small Androids, Galaxy S, SE 2/3 & mini, 12-15,
   14 Pro / 15 / 16, Pixel, Plus / Max, 16 Pro Max. 430 is the reference. */
const WIDTHS = [320, 360, 375, 390, 393, 402, 412, 414, 428, 430, 440]
const REFERENCE = 430

const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" })
const page = await browser.newPage()
await page.goto(base + "/", { waitUntil: "domcontentloaded" })
/* Past the password gate; it remembers the unlock in localStorage. */
await page.evaluate(() => localStorage.setItem("anushka-site-unlocked", "yes"))

let failed = false
for (const hash of hashes) {
  const rows = {}
  for (const width of WIDTHS) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 })
    await page.goto(base + "/" + hash, { waitUntil: "networkidle2" })
    await page.reload({ waitUntil: "networkidle2" })
    await page.evaluate(() => document.fonts.ready)
    /* The sign-up popup covers the page a second in; take it away. */
    await new Promise((r) => setTimeout(r, 1200))
    await page.evaluate(() =>
      document.querySelectorAll("[role=dialog]").forEach((d) => d.parentElement?.remove()),
    )
    rows[width] = await page.evaluate((selector) => {
      const vw = document.documentElement.clientWidth
      return [...document.querySelectorAll(selector)].map((el) => {
        const r = el.getBoundingClientRect()
        const fs = parseFloat(getComputedStyle(el).fontSize)
        /* Count visual rows: the boxes of every piece of text, grouped by
           their vertical middle, so a name and a smaller copyright centred
           on one row count once. */
        const middles = []
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        for (let t = walk.nextNode(); t; t = walk.nextNode()) {
          if (!t.textContent.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(t)
          for (const q of range.getClientRects()) {
            if (q.width > 0) middles.push(q.top + q.height / 2)
          }
        }
        middles.sort((a, b) => a - b)
        let lines = 0
        let last = -Infinity
        for (const m of middles) {
          if (m - last > fs * 0.6) lines++
          last = m
        }
        return {
          label: el.className || el.tagName.toLowerCase(),
          fontSize: Math.round(fs * 10) / 10,
          lines,
          overflow: el.scrollWidth > el.clientWidth + 1 || r.left < -1 || r.right > vw + 1,
        }
      })
    }, selector)
    rows[width].pageScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    if (width === WIDTHS[0] || width === REFERENCE) {
      const els = await page.$$(selector)
      for (const [i, el] of els.entries()) {
        await el.scrollIntoView()
        await el.screenshot({ path: `${out}/phone-${hash.replace(/\W+/g, "") || "home"}-${i}-${width}.png` })
      }
    }
  }

  console.log(`\n${hash}`)
  const ref = rows[REFERENCE]
  for (const width of WIDTHS) {
    const notes = rows[width].map((b, i) => {
      const bad =
        b.overflow || !ref[i] || b.lines !== ref[i].lines
      if (bad) failed = true
      return `${bad ? "✗" : "✓"} ${b.label}: ${b.lines} lines @ ${b.fontSize}px${b.overflow ? " OVERFLOW" : ""}`
    })
    if (rows[width].pageScroll) failed = true
    console.log(`${String(width).padStart(4)}px ${rows[width].pageScroll ? "✗ page scrolls sideways | " : ""}${notes.join(" | ")}`)
  }
}

await browser.close()
process.exit(failed ? 1 : 0)
