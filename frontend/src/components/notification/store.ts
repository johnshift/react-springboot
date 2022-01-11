import create from 'zustand';
import {
  NOTIF_SOMETHING_WENT_WRONG,
  NOTIF_TYPE_ERROR,
  NOTIF_TYPE_LOADING,
  NOTIF_TYPE_LONG,
} from './constants';
import { ErrorMsg, NotifMessage, NotifType } from './types';

interface NotifState {
  msg: NotifMessage;
  type: NotifType;
  show: boolean;

  // eslint-disable-next-line no-unused-vars
  error: (msg: ErrorMsg) => void;
  loading: () => void;
}

export const useNotif = create<NotifState>((set) => {
  let delayTimeout: NodeJS.Timeout;
  let longTimeout: NodeJS.Timeout;
  let smthTimeout: NodeJS.Timeout;

  const clear = () => {
    clearTimeout(delayTimeout);
    clearTimeout(longTimeout);
    clearTimeout(smthTimeout);

    // remove to trigger new animation
    document.getElementById('notif')?.remove();
  };

  return {
    // initial state
    msg: NOTIF_SOMETHING_WENT_WRONG,
    type: NOTIF_TYPE_ERROR,
    show: false,

    error: (msg: ErrorMsg) => {
      clear();

      set((state) => ({
        ...state,
        msg,
        type: NOTIF_TYPE_ERROR,
        show: true,
      }));

      delayTimeout = setTimeout(() => {
        set((state) => ({ ...state, show: false }));
      }, 3000);
    },

    loading: () => {
      clear();
      set((state) => ({
        ...state,
        msg: 'Loading please wait',
        type: NOTIF_TYPE_LOADING,
        show: true,
      }));

      longTimeout = setTimeout(() => {
        set((state) => ({ ...state, msg: 'Loading longer than usual', type: NOTIF_TYPE_LONG }));
      }, 5000);

      smthTimeout = setTimeout(() => {
        set((state) => ({ ...state, msg: 'Something went wrong :(', type: 'error' }));
      }, 20000);

      delayTimeout = setTimeout(() => {
        set((state) => ({ ...state, show: false }));
      }, 23000);
    },
  };
});
