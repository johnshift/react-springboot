import { createContext, useContext } from "react";
import { IPost, IPostContext } from "./types";

export const PostContext = createContext<IPostContext & IPost>(
  {} as IPost & IPostContext
);

export const usePostContext = () => {
  return useContext(PostContext);
};
