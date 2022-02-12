import { Dispatch, SetStateAction, RefObject } from "react";
import { SuggestionDataItem } from "react-mentions";

export type PostVisibility = "Only Self" | "Circle" | "Public";

export interface CreatePostRequest {
  userId: number;
  postBody: string;
  asVeil: boolean;
  mentions: SuggestionDataItem[];
}

export interface CreatePostParams {
  payload: CreatePostRequest;
  jwtToken: string;
}

export interface CreatePostResponse {
  msg: string;
}

export interface IPost {
  id: number;
  name: string;
  ts: string;
  body: string;
  visibility: "PUBLIC" | "CIRCLE" | "ONLY_SELF";
}
export interface IPostContext {
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
}

export interface ICreatePostContext {
  // isLoading: boolean;
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  postBodyPlain: string;
  setPostBodyPlain: Dispatch<SetStateAction<string>>;
  postBodyRef: RefObject<HTMLTextAreaElement>;

  cursorPos: number;
  setCursorPos: Dispatch<SetStateAction<number>>;

  asVeil: boolean;
  setAsVeil: Dispatch<SetStateAction<boolean>>;

  mentions: SuggestionDataItem[];
  setMentions: Dispatch<SetStateAction<SuggestionDataItem[]>>;
  mentionsHint: SuggestionDataItem[];
  setMentionsHint: Dispatch<SetStateAction<SuggestionDataItem[]>>;

  visibility: PostVisibility;
  setVisibility: Dispatch<SetStateAction<PostVisibility>>;

  isMobile: boolean;

  createPost: () => void;
}
