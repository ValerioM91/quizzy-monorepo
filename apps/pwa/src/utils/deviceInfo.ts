export const getDeviceType = () => {
  if (navigator.userAgent.match(/Android/i)) {
    return "Android" as const
  } else if (navigator.userAgent.match(/iPhone/i)) {
    return "iPhone" as const
  } else if (navigator.userAgent.match(/iPad/i)) {
    return "iPad" as const
  }
  return "Desktop" as const
}
