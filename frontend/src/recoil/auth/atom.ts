import { atom } from "recoil";
import { SessionT } from "../../types";

export const sessionAtom = atom<SessionT | null>({
  key: "session-atom",
  default: null,
});
