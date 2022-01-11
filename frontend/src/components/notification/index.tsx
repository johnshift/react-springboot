import { h } from 'preact';
import { classNames } from '../../utils/classNames';
import { NOTIF_TYPE_ERROR, NOTIF_TYPE_LOADING, NOTIF_TYPE_LONG } from './constants';
import * as styles from './notification.css';
import { useNotif } from './store';
import { CSSTransition } from 'preact-transitioning';

const LoadingSvg = () => (
  <svg
    class={styles.spinner}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const Notification = () => {
  const { show, type, msg } = useNotif();

  const isLoading = type === NOTIF_TYPE_LONG || type === NOTIF_TYPE_LOADING;

  return (
    <div class={styles.container} id="notif">
      <CSSTransition
        in={show}
        exit={!show}
        appear
        duration={300}
        classNames={{
          enter: styles.appear,
          enterActive: styles.appearActive,
          appear: styles.appear,
          appearActive: styles.appearActive,
          enterDone: type === NOTIF_TYPE_ERROR ? styles.shake : '',
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
      >
        <div
          class={classNames(
            styles.type[type],
            // type === NOTIF_TYPE_ERROR ? styles.shake : '',
            isLoading ? styles.pulse : '',
          )}
        >
          {isLoading && <LoadingSvg />}

          {msg}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Notification;
