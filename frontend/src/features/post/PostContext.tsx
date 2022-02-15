import { createContext, useContext } from "react";
import { Post, PostContext as IPostContext } from "./types";

const ctx = createContext<IPostContext & Post>({} as Post & IPostContext);

export const PostContextProvider = ctx.Provider;

export const usePostContext = () => {
  return useContext(ctx);
};
