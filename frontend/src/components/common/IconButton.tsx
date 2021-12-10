import { ReactEventHandler, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  onClick?: ReactEventHandler;
};

const IconButton = ({ icon, label, onClick }: Props) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="p-2 rounded-full hover:bg-light-800 hover:text-red-800"
    >
      {icon}
    </button>
  );
};

export default IconButton;
