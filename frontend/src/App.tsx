import Toaster from 'components/Toaster'
import AuthContext from 'context/AuthContext'
import ToastContext from 'context/ToastContext'
import AppRouter from 'routes/AppRouter'

function App() {
  return (
    <AuthContext>
      <ToastContext>
        <AppRouter />
        <Toaster />
      </ToastContext>
    </AuthContext>
  )
}

export default App
