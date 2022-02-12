import { createContext, useContext } from "react";
import { IPostContext } from "./types";

export const PostContext = createContext<IPostContext>({} as IPostContext);

export const usePostContext = () => {
  return useContext(PostContext);
};
