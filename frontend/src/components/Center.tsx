import React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Center = ({ children }: Props) => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {children}
    </div>
  );
};

export default Center;
