import { writable } from "svelte/store";

const ToastStore = writable({
  errmsg: "Default err msg",
});

export default ToastStore;
