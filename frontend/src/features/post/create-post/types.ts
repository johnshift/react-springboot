import { Dispatch, SetStateAction } from "react";
import { SuggestionDataItem } from "react-mentions";
import { PostVisibility } from "../types";

export interface MentionsHint {
  id: SuggestionDataItem["id"];
  display?: SuggestionDataItem["display"];
  imgUrl?: string;
}

export interface CreatePostContext {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;

  bodyPlain: string;
  setBodyPlain: Dispatch<SetStateAction<string>>;

  cursorPos: number;
  setCursorPos: Dispatch<SetStateAction<number>>;
  insertPos: number;

  asVeil: boolean;
  setAsVeil: Dispatch<SetStateAction<boolean>>;

  mentions: SuggestionDataItem[];
  setMentions: Dispatch<SetStateAction<SuggestionDataItem[]>>;
  mentionsHint: MentionsHint[];
  setMentionsHint: Dispatch<SetStateAction<MentionsHint[]>>;

  visibility: PostVisibility;
  setVisibility: Dispatch<SetStateAction<PostVisibility>>;

  isMobile: boolean;

  createPost: () => void;
}

export interface CreatePostRequest {
  userId: number;
  body: string;
  asVeil: boolean;
  mentions: SuggestionDataItem[];
}

export interface CreatePostResponse {
  msg: string;
}

export interface CreatePostParams {
  payload: CreatePostRequest;
  jwtToken: string;
}

export interface CreatePostParams {
  payload: CreatePostRequest;
  jwtToken: string;
}
