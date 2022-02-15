import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import axios from "axios";
import { SuggestionDataItem } from "react-mentions";
import { useMutation } from "react-query";

import { MSG_SOMETHING_WENT_WRONG } from "../../../constants";
import { useAppSelector } from "../../../store";
import useToast from "../../toast/useToast";
import { PostVisibility } from "../types";

import {
  apiCreatePost,
  CreatePostContext,
  CreatePostParams,
  CreatePostResponse,
} from ".";

const ctx = createContext<CreatePostContext>({} as CreatePostContext);

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [body, setBody] = useState("");
  const [bodyPlain, setBodyPlain] = useState("");
  const [cursorPos, setCursorPos] = useState(0);

  const insertPos = useMemo(() => {
    const SPLIT_PATTERN = /(@\[[^\]]+\]\([^)]+\))/;
    const MENTION_PATTERN = /(?:@\[([^\]]+)\]\(([^)]+)\))/;
    const parts = body.split(SPLIT_PATTERN);

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
  }, [cursorPos, body]);

  const [asVeil, setAsVeil] = useState(true);

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

  const [visibility, setVisibility] = useState<PostVisibility>("Public");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const { toastError } = useToast();
  const { id: userId } = useAppSelector((state) => state.userInfo);
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
      payload: { userId, body, asVeil, mentions },
      jwtToken: localStorage.getItem("authorization") as string,
    });
  };

  return (
    <ctx.Provider
      value={{
        body,
        setBody,
        bodyPlain,
        setBodyPlain,
        cursorPos,
        setCursorPos,
        insertPos,
        asVeil,
        setAsVeil,
        mentions,
        setMentions,
        mentionsHint,
        setMentionsHint,
        visibility,
        setVisibility,
        isMobile,
        createPost,
      }}
    >
      {children}
    </ctx.Provider>
  );
}

export function useCreatePostCtx(): CreatePostContext {
  return useContext(ctx);
}
