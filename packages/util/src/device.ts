export const isAndroid = () => window.navigator.userAgent.toLowerCase().includes('android')
export function isIos() {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
export const isTouchable = () => isAndroid() || isIos()


/**
 * estimates client speed by fetching robots.txt and measuring the time it takes
 *
 * Features:
 * - is cached for 30 seconds
 * - has a lock to prevent race conditions
 *
 * Returns:
 * 0 - slow-3g or worse
 * 1 - approximately fast-3g
 * 2 - faster than fast-3g
 */
let lastUpdated = 0
let last = 0
let lock = false
export async function getSpeed() {
  if (lock) {
    return new Promise((res) => {
      const interval = setInterval(() => {
        if (!lock) {
          res(last)
          clearInterval(interval)
        } else console.debug("getSpeed:Locked...")
      }, 100)
    })
  }
  const start = Date.now()
  if (start - lastUpdated < 30000) return last
  lock = true
  console.debug("getSpeed:Fetching...")
  await fetch("/version.json")
  const duration = Date.now() - start
  console.debug("getSpeed.duration: " + duration)
  let speed = 0 // slow-3g or worse
  if (duration < 500) speed = 2
  else if (duration < 1000) speed = 1 // ~fast-3g
  last = speed
  lastUpdated = start
  lock = false
  return speed
}
