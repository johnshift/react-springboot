import { styled } from "@linaria/react";
import { h } from "preact";
import { useToast } from "./store";

const C = styled.div`
  position: fixed;
  bottom: 2em;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const W = styled.div`
  border: 1px solid red;
  padding: 1em 1.5em;
`;

const Notification = () => {
  const { show, message } = useToast();

  if (!show) {
    return null;
  }

  return (
    <C>
      <W>
        <h1>{message}</h1>
      </W>
    </C>
  );
};

export default Notification;
