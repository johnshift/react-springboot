import { writable, Writable, derived, Readable } from "svelte/store";
import { DEFAULT_NOTIFICATION_DURATION } from "../lib/constants";

export type NotificationType = "success" | "info" | "error" | "loading";

type Notification = {
  msg: string;
  type: NotificationType;
  show: boolean;
  id: number;
};

const createNotificationsStore = () => {
  const _state = writable({} as Notification);

  // call this to update the current state
  const newNotification = (msg: string, type: NotificationType) => {
    _state.update(() => {
      // return { msg, type, show: true };
      return { msg, type, show: true, id: Date.now() };
    });
  };

  const dismiss = () => {
    _state.update((prev) => {
      return { ...prev, show: false };
    });
  };

  // we use a derived value of the current notification state to watch changes
  const notification: Readable<Notification> = derived(
    _state,
    ($_state, set) => {
      set($_state);

      // if notification is shown -> set show to false after certain time
      const timer = setTimeout(() => {
        _state.update((state) => {
          return { ...state, show: false };
        });
      }, DEFAULT_NOTIFICATION_DURATION);

      // derived returns a call back function
      // when subscribed, call this to cleanup (automated if using '$')
      return () => {
        clearTimeout(timer);
      };

      // if ($_state.show) {
      //   const timer = setTimeout(() => {
      //     _state.update((state) => {
      //       return { ...state, show: false };
      //     });
      //   }, DEFAULT_NOTIFICATION_DURATION);

      //   // derived returns a call back function
      //   // when subscribed, call this to cleanup (automated if using '$')
      //   return () => {
      //     clearTimeout(timer);
      //   };
      // }
    }
  );

  // we extract subscribe of the derived state
  const { subscribe } = notification;

  // we use subscription of derived state
  // to implement a svelte store
  return {
    subscribe,
    newNotification,
    dismiss,
  };
};

const NotificationStore = createNotificationsStore();

export const notify = NotificationStore.newNotification;
export const dismissNotification = NotificationStore.dismiss;
export default NotificationStore;
