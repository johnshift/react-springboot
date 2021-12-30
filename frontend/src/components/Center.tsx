import { ReactNode } from 'react'
import { classNames } from 'utils'

type Height = 'full' | 'screen'

type Props = {
  children: ReactNode
  h?: Height
}

const Center = ({ children, h = 'full' }: Props): JSX.Element => (
  <div
    className={classNames('flex justify-center items-center mx-auto', 'h-' + h)}
  >
    {children}
  </div>
)

export default Center
