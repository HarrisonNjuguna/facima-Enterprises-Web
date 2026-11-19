import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { CarProvider } from './context/CarContext'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { CarDetailPage } from './pages/CarDetailPage'
import { FinancePage } from './pages/FinancePage'
import { FinanceTermsPage } from './pages/FinanceTermsPage'
import { HomePage } from './pages/HomePage'
import { InventoryPage } from './pages/InventoryPage'
import { SellPage } from './pages/SellPage'

export default function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="inventory/:id" element={<CarDetailPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="finance/terms" element={<FinanceTermsPage />} />
              <Route path="sell" element={<SellPage />} />
              <Route path="gate" element={<AdminLoginPage />} />
              <Route path="gate/inventory" element={<AdminDashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CarProvider>
    </AuthProvider>
  )
}