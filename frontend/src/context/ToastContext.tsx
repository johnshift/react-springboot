import { ToastMsg, ToastType } from 'components/Toaster'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type ToastCtx = {
  msg: string
  type: ToastType
  show: boolean
  resolved: boolean
  toast: (msg: ToastMsg, type: ToastType) => void
}

const Ctx = createContext<ToastCtx>({} as ToastCtx)

const ToastContext = ({ children }: { children: ReactNode }) => {
  const [msg, setMsg] = useState<ToastMsg>('Something went wrong :(')
  const [type, setType] = useState<ToastType>('error')
  const [show, setShow] = useState(false)
  const [resolved, setResolved] = useState(true)

  useEffect(() => {
    if (show && type !== 'loading' && type !== 'long') {
      console.log('useEffect dismiss')

      const delayTimeout = setTimeout(() => {
        setShow(false)
      }, 3000)

      return () => clearTimeout(delayTimeout)
    }
  }, [show, type])

  const errTimeout = () => {
    setResolved(false)

    setTimeout(() => {
      setMsg('Loading longer than usual')
      setType('long')
    }, 10000)

    setTimeout(() => {
      setMsg('Something went wrong :(')
      setType('error')
      setResolved(true)
    }, 20000)
  }

  const toast = (newMsg: ToastMsg, newType: ToastType) => {
    setMsg(newMsg)
    setType(newType)
    setShow(true)

    newType === 'loading' ? errTimeout() : setResolved(true)
  }

  return (
    <Ctx.Provider
      value={{
        msg,
        type,
        show,
        resolved,
        toast
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export default ToastContext
export const useToast = () => useContext(Ctx)
