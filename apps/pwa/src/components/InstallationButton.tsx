import { useEffect } from "react"
import { useState } from "react"
import Button from "./Button"

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt: () => Promise<void>
}

const InstallationButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      const event = e as BeforeInstallPromptEvent
      e.preventDefault()
      setDeferredPrompt(event)
    })
  }, [])

  const installationHandler = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = (await deferredPrompt.userChoice) as { outcome: "accepted" | "dismissed" }
    if (outcome === "accepted") setDeferredPrompt(null)
  }

  if (!deferredPrompt) return null

  return (
    <Button variant="amber" className="fixed right-4 top-4" onClick={installationHandler}>
      Install on your device!
    </Button>
  )
}
export default InstallationButton
