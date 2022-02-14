import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";
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
  CreatePostParams,
} from "./types";

const CreatePostContext = createContext<ICreatePostContext>(
  {} as ICreatePostContext
);

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [postBody, setPostBody] = useState(
    "asdfdsf sadfasfd @[XXX](XXX) sdf @[pak](pak) sdlfj"
  );
  const [postBodyPlain, setPostBodyPlain] = useState("");
  const fieldRef = useRef<HTMLTextAreaElement>(null);

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

  const rawPos = useMemo(() => {
    const SPLIT_PATTERN = /(@\[[^\]]+\]\([^)]+\))/;
    const MENTION_PATTERN = /(?:@\[([^\]]+)\]\(([^)]+)\))/;
    const parts = postBody.split(SPLIT_PATTERN);

    const cleanParts = [];
    for (const s of parts) {
      if (!s.startsWith("@")) {
        cleanParts.push(s);
        continue;
      }

      const match = s.match(MENTION_PATTERN);
      if (!match || match.length < 3) {
        cleanParts.push(s);
        continue;
      }

      const [, name] = match;
      cleanParts.push(name);
    }

    const rawCumLen = parts.map(
      (
        (sum) => (value: string) =>
          (sum += value.length)
      )(0)
    );

    const cleanCumLen = cleanParts.map(
      (
        (sum) => (value: string) =>
          (sum += value.length)
      )(0)
    );

    let el = 0;
    for (let i = 0; i < cleanCumLen.length; i++) {
      if (cursorPos <= cleanCumLen[i]) {
        el = i;
        break;
      }
    }
    const offset = rawCumLen[el] - cleanCumLen[el];

    return cursorPos + offset;
  }, [cursorPos, postBody]);

  return (
    <CreatePostContext.Provider
      value={{
        // isLoading,
        postBody,
        setPostBody,
        postBodyPlain,
        setPostBodyPlain,
        fieldRef,
        rawPos,
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
