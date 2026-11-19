import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AdminLoginPage() {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAdmin) {
    return <Navigate to="/gate/inventory" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = login(username, password)
    if (ok) {
      navigate('/gate/inventory', { replace: true })
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <section className="section container admin-login">
      <div className="admin-login__card">
        <h1>Staff access</h1>
        <p className="muted">
          This area is for Facima inventory managers only. There is no link in the
          main menu — use the padlock in the site footer.
        </p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          <label className="field">
            <span>Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn--primary">
            Sign in
          </button>
        </form>
      </div>
    </section>
  )
}