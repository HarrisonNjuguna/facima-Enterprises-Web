import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPwaBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onInstall = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener('beforeinstallprompt', onInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  async function install() {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
    setBannerOpen(false)
  }

  if (installed || !deferred) return null

  if (!bannerOpen) {
    return (
      <button
        type="button"
        className="pwa-install-fab"
        aria-label="Install Facima app"
        onClick={() => setBannerOpen(true)}
      >
        <span className="pwa-install-fab__pulse" aria-hidden />
        Install app
      </button>
    )
  }

  return (
    <aside className="pwa-banner pwa-banner--glow" role="region" aria-label="Install app">
      <button
        type="button"
        className="pwa-banner__close"
        aria-label="Dismiss install prompt"
        onClick={() => setBannerOpen(false)}
      >
        ×
      </button>
      <p>
        <strong>Install Facima</strong> — browse stock and finance from your home
        screen.
      </p>
      <div className="pwa-banner__actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={install}>
          Install
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setBannerOpen(false)}
        >
          Later
        </button>
      </div>
    </aside>
  )
}