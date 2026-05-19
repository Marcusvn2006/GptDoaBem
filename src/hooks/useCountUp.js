import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!start) return

    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * numeric))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setValue(numeric)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [start, target, duration])

  return value
}
