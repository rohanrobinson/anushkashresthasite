import { useEffect, useState } from "react"

// Matches the 640px phone breakpoint used in index.css.
const PHONE_QUERY = "(max-width: 640px)"

/* True on phone-width screens, kept in step as the window resizes. */
export default function useIsPhone() {
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY)
    const update = () => setIsPhone(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isPhone
}
