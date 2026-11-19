import { Outlet, useLocation } from 'react-router-dom'
import { DriveXFooter } from './drivex/DriveXFooter'
import { DriveXHeader } from './drivex/DriveXHeader'
import { Footer } from './Footer'
import { Header } from './Header'
import { InstallPwaBanner } from './InstallPwaBanner'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={isHome ? 'app-shell app-shell--drivex' : 'app-shell'}>
      {isHome ? <DriveXHeader /> : <Header />}
      <InstallPwaBanner />
      <main className="main-flow">
        <Outlet />
      </main>
      {isHome ? <DriveXFooter /> : <Footer />}
    </div>
  )
}