import { styled } from "@linaria/react";
import React from "react";
import { useNotif } from "./store";

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
  const { show, msg } = useNotif();

  if (!show) {
    return null;
  }

  return (
    <C>
      <W>
        <h1>{msg}</h1>
      </W>
    </C>
  );
};

export default Notification;
