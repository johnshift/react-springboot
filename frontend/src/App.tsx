import { Link } from 'wouter'
import AuthContext from 'context/AuthContext'
import AppRouter from 'routes/AppRouter'

function App() {
  return (
    <AuthContext>
      <AppRouter />
    </AuthContext>
  )
}

export default App
