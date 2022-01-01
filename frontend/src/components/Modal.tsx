import { ReactNode } from "react";
import styles from "./modal.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ show, onClose, children }: Props) => {
  return (
    <>
      {show && (
        <div className={styles.container} onClick={onClose}>
          <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
