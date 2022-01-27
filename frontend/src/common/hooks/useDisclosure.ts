import { useState } from "react";

const useDisclosure = () => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const open = () => {
    setShow(true);
  };

  return {
    show,
    close,
    open,
  };
};

export default useDisclosure;
