import { GetState, SetState } from "zustand";

import { Store } from "../types";
import {
  mockedUsername,
  mockedName,
  mockedVeil,
} from "../modules/__mocks__/auth";

const createAuthSlice = (set: SetState<Store>, _get: GetState<Store>) => ({
  name: mockedName,
  username: mockedUsername,
  veil: mockedVeil,
  setAuthName: (name: string) => {
    set((_state) => {
      return {
        name: name,
      };
    });
  },
});

export default createAuthSlice;
