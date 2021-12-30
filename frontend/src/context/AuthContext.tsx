import { KEY_AUTHORIZATION } from '../constants'
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react'

type AuthCtx = {
  isAuthenticated: boolean
  authLogin: (token?: string) => void
  authLogout: () => void
}

const Ctx = createContext<AuthCtx>(undefined as any)

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(KEY_AUTHORIZATION)

    if (token) {
      authLogin()
    }
  }, [])

  const authLogin = (token?: string) => {
    if (token) {
      localStorage.setItem(KEY_AUTHORIZATION, token)
    }

    setIsAuthenticated(true)
  }

  const authLogout = () => {
    localStorage.removeItem(KEY_AUTHORIZATION)
  }

  return (
    <Ctx.Provider
      value={{
        isAuthenticated,
        authLogin,
        authLogout
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export default AuthContext
export const useAuth = () => useContext(Ctx)
