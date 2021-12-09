import { ReactNode } from "react";

const PageCenter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex container mx-auto h-screen justify-center items-center">
      {children}
    </div>
  );
};

export default PageCenter;
