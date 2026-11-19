import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { InstallPwaBanner } from './InstallPwaBanner'

export function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <InstallPwaBanner />
      <main className="main-flow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}