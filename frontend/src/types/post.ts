import { Reaction } from "./reaction";

export type Post = {
  id: number;
  owner: string;
  created: string;
  body: string;
  vote_count: number;
  comment_count: number;
  reactions: Reaction[];
};

export type PostInput = {
  body: string;
  asVeil: boolean;
};
