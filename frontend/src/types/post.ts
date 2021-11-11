import { ReactionT } from ".";

export type PostT = {
  id: number;
  owner: string;
  created: string;
  body: string;
  voteCount: number;
  commentCount: number;
  reactions: ReactionT[];
};
