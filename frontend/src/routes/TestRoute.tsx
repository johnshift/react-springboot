import { useToast } from 'context/ToastContext'

const TestRoute = () => {
  const { resolved, toast } = useToast()

  return (
    <>
      <p>resolved = {resolved.toString()}</p>
      {!resolved ? (
        <h1>Loading nigga ...</h1>
      ) : (
        <button
          onClick={() => {
            toast('Loading please wait', 'loading')
          }}
        >
          Show toast
        </button>
      )}
    </>
  )
}

export default TestRoute
