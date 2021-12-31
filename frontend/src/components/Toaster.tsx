import { Transition } from '@headlessui/react'
import { useToast } from 'context/ToastContext'
import { classNames } from 'utils'

export type ToastMsg =
  | 'Something went wrong :('
  | 'Incorrect username/email or password'
  | 'Loading please wait'
  | 'Loading longer than usual'

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'long'

const borders: Record<ToastType, string> = {
  loading: 'bg-amber-400',
  long: 'bg-orange-500 animate-pulse',
  info: 'bg-blue-400',
  success: 'bg-green-600',
  error: 'bg-red-700'
}

const Toaster = () => {
  const { msg, show, type } = useToast()
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex fixed bottom-5 justify-center w-full animate-appear">
        <div className={type === 'error' ? 'animate-shake' : ''}>
          <div
            className={classNames(
              'flex p-3 px-5 font-semibold text-center rounded-lg text-white',
              borders[type]
            )}
          >
            {(type === 'loading' || type === 'long') && (
              <div className="pt-0.5">
                <svg
                  className="mr-3 w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            )}
            {msg}
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Toaster
