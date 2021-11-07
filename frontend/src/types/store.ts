import { Post } from "./post";
import { Reaction } from "./reaction";

export type Store = {
  // POST
  posts: Post[];
  addPost: (post: Post) => void;
  updatePostVote: (id: number, inc: number) => void;
  addReaction: (post_id: number, emoji: string) => void;
  listReactionEmojis: (id: number) => string[];
  getReactions: (post_id: number) => Reaction[];

  // AUTH
  username: string;
  name: string;
  veil: string;
  setAuthName: (name: string) => void;
};
