import { JSX } from 'preact';

type ButtonProps = {
  text: string;
  label?: string;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ text, label, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label || text}
      onClick={onClick}
      class="
        px-5 py-2.5 border-r border-2
        text-white text-sm text-center  
        bg-pink-800 hover:bg-pink-700 focus:outline-none
      "
    >
      {text}
    </button>
  );
};

export default Button;
