import { writable, derived } from 'svelte/store'

const createNotificationsStore = () => {
  const _state = writable({});

  // call this to update the current state
  const newNotification = async (msg, type, duration = 3000) => {
    _state.update(() => {
      return {
        msg,
        type,
        show: true,
        id: Date.now(),
        duration: type === "loading" ? 1000 * 999 : duration,
      };
    });
  };

  const dismiss = () => {
    _state.update((prev) => {
      return { ...prev, show: false };
    });
  };

  // we use a derived value of the current notification state to watch changes
  const notification = derived(_state, ($_state, set) => {
      set($_state);

      // if notification is shown -> set show to false after certain time
      const timer = setTimeout(() => {
        _state.update((state) => {
          return { ...state, show: false };
        });
      }, $_state.duration);

      // derived returns a call back function
      // when subscribed, call this to cleanup (automated if using '$')
      return () => {
        clearTimeout(timer);
      };
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
