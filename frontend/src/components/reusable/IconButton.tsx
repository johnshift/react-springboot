import { JSX } from 'preact';

type IconButtonProps = {
  icon: string | JSX.Element;
  label: string;
  className?: string;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ icon, label, className, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      class={
        className || 'p-2 rounded-full hover:bg-light-500 hover:text-pink-800 focus:outline-none '
      }
    >
      {icon}
    </button>
  );
};

export default IconButton;
