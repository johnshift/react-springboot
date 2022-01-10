import { ComponentChildren, h } from 'preact';

import * as styles from './button.css';

interface Props {
  // variants?: ButtonVariants;
  variant: keyof typeof styles.variants;
  onClick?: () => void;
  children: ComponentChildren;
}

const Button = ({ variant, onClick, children }: Props) => {
  return (
    // <button onClick={onClick} class={`${button({ ...variants })}`}>
    <button onClick={onClick} class={styles.variants[variant]}>
      {children}
    </button>
  );
};

export default Button;
