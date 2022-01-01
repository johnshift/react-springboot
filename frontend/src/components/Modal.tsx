import React, { ReactNode } from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
`;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-width: min(360px, 80%);
`;

type Props = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ show, onClose, children }: Props) => {
  return (
    <>
      {show && (
        <Container onClick={onClose}>
          <Wrapper onClick={(e) => e.stopPropagation()}>{children}</Wrapper>
        </Container>
      )}
    </>
  );
};

export default Modal;
