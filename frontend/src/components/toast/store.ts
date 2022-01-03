import create from "zustand";

type ToastErrorMessage =
  | "Something went wrong :("
  | "Incorrect username/email or password";

type ToastLoadingMessage = "Loading please wait" | "Loading longer than usual";

type ToastMessage = ToastErrorMessage | ToastLoadingMessage;
type ToastType = "error" | "loading";

interface ToastState {
  message: ToastMessage;
  type: ToastType;
  show: boolean;
  error: (message: ToastErrorMessage) => void;
}

export const useToast = create<ToastState>((set) => {
  let delayTimeout: NodeJS.Timeout;

  return {
    message: "Something went wrong :(",
    type: "error",
    show: false,

    error: (message: ToastErrorMessage) => {
      // clear delayTimeout to prevent destroying new toasts
      clearTimeout(delayTimeout);

      // show toast
      set((state) => ({
        ...state,
        message,
        type: "error",
        show: true,
      }));

      // destroy toast after 3sec
      delayTimeout = setTimeout(() => {
        set((state) => ({ ...state, show: false }));
      }, 3000);
    },
  };
});
