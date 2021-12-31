import AuthContext from 'context/AuthContext'
import ToastContext from 'context/ToastContext'
import AppRouter from 'routes/AppRouter'

function App() {
  return (
    <AuthContext>
      <ToastContext>
        <AppRouter />
      </ToastContext>
    </AuthContext>
  )
}

export default App
