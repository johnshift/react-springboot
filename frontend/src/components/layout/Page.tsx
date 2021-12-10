import { ReactNode } from "react";
import Navbar from "../common/Navbar.server";

type Props = {
  withNav?: boolean;
  children: ReactNode;
};

const Page = ({ withNav, children }: Props) => {
  return (
    <>
      {withNav && <Navbar />}
      <div style={{ marginTop: withNav ? "90px" : "0" }}>{children}</div>
    </>
  );
};

export default Page;
