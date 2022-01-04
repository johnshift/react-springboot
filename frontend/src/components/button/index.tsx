import { ComponentChildren, h } from "preact";

import { button, ButtonVariants } from "./button.css";

interface Props {
  variants?: ButtonVariants;
  onClick?: () => void;
  children: ComponentChildren;
}

const Button = ({ variants, onClick, children }: Props) => {
  return (
    <button onClick={onClick} class={`${button({ ...variants })}`}>
      {children}
    </button>
  );
};

export default Button;
