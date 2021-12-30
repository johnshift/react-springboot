import { useAuth } from 'context/AuthContext'
import { createElement, useEffect } from 'react'
import { RouteProps, useLocation, useRoute } from 'wouter'

const AuthRoute = ({ path, component, children }: RouteProps) => {
  const { isAuthenticated } = useAuth()
  const [match, params] = useRoute(path!)
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login')
    }
  }, [isAuthenticated, setLocation])

  if (!isAuthenticated) {
    setLocation('/login')
    return null
  }

  if (!match) {
    return null
  }

  if (component && params) {
    return createElement(component, { params })
  }

  return typeof children === 'function' ? children(params!) : children
}

export default AuthRoute
