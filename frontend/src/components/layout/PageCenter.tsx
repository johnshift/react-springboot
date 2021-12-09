import { ReactNode } from "react";

const PageCenter = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "-webkit-fill-available",
      }}
    >
      <div className="flex container mx-auto h-full justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PageCenter;
