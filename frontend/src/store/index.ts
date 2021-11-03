import create, { GetState, SetState } from "zustand";

import createPostSlice from "./post";

const createAuthSlice = (_set: SetState<Store>, _get: GetState<Store>) => ({
  auth_username: "user_1",
  auth_name: "John Smith",
});

const useStore = create<Store>((set, get) => ({
  ...createPostSlice(set, get),
  ...createAuthSlice(set, get),
}));

export default useStore;
