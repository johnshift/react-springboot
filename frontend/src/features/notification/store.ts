import create from "zustand";
import { NOTIF_SOMETHING_WENT_WRONG, NOTIF_TYPE_ERROR } from "./constants";
import { ErrorMsg, NotifMessage, NotifType } from "./types";

interface NotifState {
  msg: NotifMessage;
  type: NotifType;
  show: boolean;

  error: (msg: ErrorMsg) => void;
}

export const useNotif = create<NotifState>((set) => {
  let delayTimeout: NodeJS.Timeout;

  return {
    // initial state
    msg: NOTIF_SOMETHING_WENT_WRONG,
    type: NOTIF_TYPE_ERROR,
    show: false,

    error: (msg: ErrorMsg) => {
      clearTimeout(delayTimeout);
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
  };
});
