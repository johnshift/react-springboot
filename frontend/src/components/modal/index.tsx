import { ComponentChildren, h } from "preact";
import { styled } from "@linaria/react";

const C = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
`;

const W = styled.div`
  display: grid;
  place-items: center;
  min-width: min(360px, 80%);
`;

type Props = {
  show: boolean;
  onClose: () => void;
  children: ComponentChildren;
};

const Modal = ({ show, onClose, children }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <C onClick={onClose}>
      <W onClick={(e) => e.stopPropagation()}>{children}</W>
    </C>
  );
};

export default Modal;
