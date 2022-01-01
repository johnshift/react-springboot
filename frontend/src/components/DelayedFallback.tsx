import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
};

// only display fallback after 300ms (get rid of glitch-ux)
const DelayedFallback = ({ children, delay = 300 }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{show && children}</>;
};

export default DelayedFallback;
