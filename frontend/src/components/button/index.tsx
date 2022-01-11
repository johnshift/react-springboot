import { ComponentChildren, h, JSX } from 'preact';

import * as styles from './button.css';

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variants;
  children: ComponentChildren;
}

const Button = ({ variant = 'default', onClick, children }: Props) => {
  return (
    <button onClick={onClick} class={styles.variants[variant]}>
      {children}
    </button>
  );
};

export default Button;
