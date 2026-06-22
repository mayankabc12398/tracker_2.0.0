// ────────────────────────────────────────────────────────────────────────────
// ProtectedRoute — login ke bina personal app pages block. Logged out → /login
// par bhej do (aur yaad rakho user kahan jaana chahta tha, taaki login ke baad
// wahin wapas le jaa sakein).
// ────────────────────────────────────────────────────────────────────────────
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth()
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
