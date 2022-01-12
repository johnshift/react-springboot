import { ComponentChildren, Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

type Props = {
  children: ComponentChildren;
  delay: number;
};

const DelayedFallback = ({ children, delay }: Props) => {
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

  return <Fragment>{show && children}</Fragment>;
};

export default DelayedFallback;
