import { Dispatch, SetStateAction } from "react";

export type PostVisibility = "Only Self" | "Circle" | "Public";

export interface Post {
  id: number;
  name: string;
  url: string;
  ts: string;
  body: string;
  visibility: PostVisibility;
  votes: number;
  reactions: Reaction[];
}
export interface PostContext {
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;

  userVote: number;
  setUserVote: Dispatch<SetStateAction<number>>;

  userReaction: string | undefined;
  setUserReaction: Dispatch<SetStateAction<string | undefined>>;
}

export interface Reaction {
  id: string;
  emoji: string;
  name: string;
}
