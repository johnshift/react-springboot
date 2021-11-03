import { GetState, SetState } from "zustand";
import { mockedPosts } from "../modules/__mocks__/posts";

import { Store, Post } from "../types";

const createPostSlice = (set: SetState<Store>, _get: GetState<Store>) => ({
  posts: mockedPosts,
  addPost: (post: Post) => {
    set((state) => ({
      posts: [post, ...state.posts],
    }));
  },
  updatePostVote: (id: number, inc: number) => {
    set((state) => {
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === id) {
          state.posts[i].vote_count += inc;
        }
      }

      return {
        posts: state.posts,
      };
    });
  },
  addReaction: (post_id: number, name: string, emoji: string) => {
    set((state) => {
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === post_id) {
          state.posts[i].reactions.push({
            owner: name,
            reaction: emoji,
          });
        }
      }
    });
  },
});

export default createPostSlice;
