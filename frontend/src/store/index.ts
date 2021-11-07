import create from "zustand";

import { Store } from "../types";

import createPostSlice from "./post";
import createAuthSlice from "./auth";

const useStore = create<Store>((set, get) => ({
  ...createPostSlice(set, get),
  ...createAuthSlice(set, get),
}));

export default useStore;
