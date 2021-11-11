import { atom } from "recoil";
import { PostT } from "../../features/post";

export const postsAtom = atom<PostT[]>({
  key: "posts-atom",
  default: [],
});
