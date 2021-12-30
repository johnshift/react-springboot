// import LoginFormSkeleton from 'features/Login/LoginFormSkeleton'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'

const Home = lazy(() => import('../features/Home/HomePage'))
const Login = lazy(() => import('../features/Login/LoginPage'))
const Register = lazy(() => import('../features/Register/RegisterPage'))

import PageLoader from '../components/Loaders/PageLoader'
import AuthRoute from './AuthRoute'
import TestRoute from './TestRoute'

const AppRouter = () => {
  return (
    <Switch>
      <AuthRoute path="/">
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
      </AuthRoute>
      <Route path="/login">
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/register">
        <Suspense fallback={<PageLoader />}>
          <Register />
        </Suspense>
      </Route>
      <Route path="/test">
        <TestRoute />
      </Route>
      <Route>
        <Suspense fallback={<PageLoader />}>
          <h1>NOT FOUND</h1>
        </Suspense>
      </Route>
    </Switch>
  )
}

export default AppRouter
