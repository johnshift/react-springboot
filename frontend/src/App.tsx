import { Link } from 'wouter'
import AuthContext from 'context/AuthContext'
import AppRouter from 'routes/AppRouter'

function App() {
  return (
    <AuthContext>
      <div>
        <Link href="/">
          <a>Home Page</a>
        </Link>
        <br />
        <Link href="/login">
          <a>Login Page</a>
        </Link>
        <br />
        <Link href="/register">
          <a>Register Page</a>
        </Link>
        <br />
      </div>

      <AppRouter />
    </AuthContext>
  )
}

export default App
