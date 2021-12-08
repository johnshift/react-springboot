import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

// this can be any wrapper or layout
const Page = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Veils App</title>
        <meta name="description" content="Share your secrets anonymously" />
      </Head>
      <div>
        <h1 className="text-orange-500">fuck you</h1>
        {children}
      </div>
    </>
  );
};

export default Page;
