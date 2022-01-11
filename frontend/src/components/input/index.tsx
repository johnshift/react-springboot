import { h, JSX } from 'preact';

import * as styles from './input.css';

interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = ({ hasError = false, ...props }: Props) => {
  return (
    <input
      {...props}
      class={[styles.base, styles.border[hasError ? 'error' : 'default']].join(' ')}
    />
  );
};

export default Input;
