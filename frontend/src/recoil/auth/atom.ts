import { atom } from "recoil";
import { LoginT } from "../../types";

export const loginAtom = atom<LoginT>({
  key: "login-atom",
  default: {} as LoginT,
});
