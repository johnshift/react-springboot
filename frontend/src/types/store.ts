import { Post } from "./post";

export type Store = {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePostVote: (id: number, inc: number) => void;
  addReaction: (post_id: number, name: string, emoji: string) => void;

  auth_username: string;
  auth_name: string;
};
