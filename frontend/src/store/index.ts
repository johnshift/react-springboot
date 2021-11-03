import create, { GetState, SetState } from "zustand";

import { Store } from "../types";

import createPostSlice from "./post";

const createAuthSlice = (set: SetState<Store>, _get: GetState<Store>) => ({
  auth_username: "user_1",
  auth_name: "John Smith",
  setAuthName: (name: string) => {
    set((_state) => {
      return {
        auth_name: name,
      };
    });
  },
});

const useStore = create<Store>((set, get) => ({
  ...createPostSlice(set, get),
  ...createAuthSlice(set, get),
}));

export default useStore;
