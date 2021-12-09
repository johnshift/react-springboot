import { ReactEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: ReactEventHandler;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 rounded h-15 w-120px border border-red-500 text-lg"
    >
      {children}
    </button>
  );
};

export default Button;
