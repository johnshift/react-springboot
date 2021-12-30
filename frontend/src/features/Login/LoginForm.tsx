import { FormEvent, useState } from 'react'

const LoginForm = () => {
  const [payload, setPayload] = useState({
    principal: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).name
    setPayload({
      ...payload,
      [name]: (e.target as HTMLInputElement).value
    })
  }

  const border = hasError ? ' border-red-300' : ''
  const inputClassName = 'w-full mb-10' + border
  const passwordClassName =
    'rounded-none rounded-l-lg block flex-1 min-w-0 w-full border-r-0' + border

  return (
    <div className="p-10 w-11/12 lg:w-9/12 hd:w-8/12 rounded-lg border border-gray-300 shadow-md">
      <form>
        <input
          name="principal"
          placeholder="Username or Email"
          className={inputClassName}
          onChange={handleChange}
          value={payload.principal}
          autoFocus
        />

        <div className="flex mb-8 w-full">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={payload.password}
            onChange={handleChange}
            className={passwordClassName}
          />
          <span
            aria-label="show password"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            className="inline-flex justify-center items-center w-[60px] text-sm lg:text-base bg-gray-200 hover:bg-gray-100 rounded-r-md border border-l-0 border-gray-300 transition-colors duration-300 ease-in-out cursor-pointer select-none"
          >
            {showPassword ? 'hide' : 'show'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <a href="/register">Create an account</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-24 font-semibold text-white hover:text-white bg-red-700 hover:bg-red-600"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
