import { useMediaQuery, useTheme } from "@mui/material";
import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useState, useRef } from "react";
import { SuggestionDataItem } from "react-mentions";
import { useMutation } from "react-query";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { useAppSelector } from "../../store";
import useToast from "../toast/useToast";
import { apiCreatePost } from "./api";

import {
  PostVisibility,
  ICreatePostContext,
  CreatePostResponse,
  CreatePostRequest,
  CreatePostParams,
} from "./types";

const CreatePostContext = createContext<ICreatePostContext>(
  {} as ICreatePostContext
);

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [postBody, setPostBody] = useState("");
  const [postBodyPlain, setPostBodyPlain] = useState("");
  const postBodyRef = useRef<HTMLTextAreaElement>(null);

  const [cursorPos, setCursorPos] = useState(0);

  const [asVeil, setAsVeil] = useState(false);
  const [visibility, setVisibility] = useState<PostVisibility>("Public");

  const [mentions, setMentions] = useState<SuggestionDataItem[]>([]);
  const [mentionsHint, setMentionsHint] = useState<SuggestionDataItem[]>([
    {
      id: "john",
      display: "John Ballesteros",
    },
    {
      id: "nikka",
      display: "Nikka Melgar",
    },
    {
      id: "XXX",
      display: "XXX",
    },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const { id: userId } = useAppSelector((state) => state.userInfo);

  const { toastError } = useToast();

  const createPostMutation = useMutation<
    CreatePostResponse,
    Error,
    CreatePostParams
  >(async ({ payload, jwtToken }) => apiCreatePost(payload, jwtToken), {
    onSuccess: (data: CreatePostResponse) => {
      return console.log("mutation onSuccess data =", data);
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toastError(error.response?.data.message);
        return;
      }
      toastError(MSG_SOMETHING_WENT_WRONG);
    },
  });

  const createPost = () => {
    createPostMutation.mutate({
      payload: { userId, postBody, asVeil, mentions },
      jwtToken: localStorage.getItem("authorization") as string,
    });
  };

  return (
    <CreatePostContext.Provider
      value={{
        // isLoading,
        postBody,
        setPostBody,
        postBodyPlain,
        setPostBodyPlain,
        postBodyRef,
        cursorPos,
        setCursorPos,
        asVeil,
        setAsVeil,
        mentions,
        setMentions,
        mentionsHint,
        setMentionsHint,
        isMobile,
        visibility,
        setVisibility,
        createPost,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}

export default function useCreatePost() {
  return useContext(CreatePostContext);
}
