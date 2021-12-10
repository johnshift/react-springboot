import { ReactNode } from "react";

const Center = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full justify-center items-center">{children}</div>
  );
};

export default Center;
