import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPwaBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('facima_pwa_dismiss') === '1',
  )
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
  }

  if (installed || dismissed || !deferred) return null

  return (
    <PwaBannerContent
      install={install}
      onCancel={() => {
        localStorage.setItem('facima_pwa_dismiss', '1')
        setDismissed(true)
      }}
    />
  )
}

function PwaBannerContent({
  install,
  onCancel,
}: {
  install: () => void
  onCancel: () => void
}) {
  return (
    <aside className="pwa-banner" role="region" aria-label="Install app">
      <p>
        <strong>Install Facima</strong> — browse stock and run finance estimates
        from your home screen.
      </p>
      <div className="pwa-banner__actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={install}>
          Install
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onCancel}>
          Not now
        </button>
      </div>
    </aside>
  )
}