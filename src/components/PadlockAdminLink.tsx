import { Link } from 'react-router-dom'

export function PadlockAdminLink() {
  return (
    <Link
      to="/gate"
      className="admin-padlock"
      title="Staff access"
      aria-label="Staff access (admin login)"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 11V8a5 5 0 0 1 10 0v3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <rect
          x="5"
          y="11"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="12" cy="16" r="1.25" fill="currentColor" />
      </svg>
    </Link>
  )
}