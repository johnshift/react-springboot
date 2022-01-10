import { h, ComponentChildren } from 'preact';

import * as styles from './modal.css';

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
    <div class={styles.container} onClick={onClose}>
      <div class={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
