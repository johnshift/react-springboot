import { GetState, SetState } from "zustand";
import { mockedPosts } from "../modules/__mocks__/posts";

import { Store, Post, Reaction } from "../types";

const createPostSlice = (set: SetState<Store>, get: GetState<Store>) => ({
  posts: mockedPosts,

  addPost: (post: Post) => {
    // NOTE: Obtain id from the backend
    post.id = 999;
    set((state) => ({
      posts: [post, ...state.posts],
    }));
  },

  updatePostVote: (id: number, inc: number) => {
    console.log("id: ", id, "inc: ", inc);
    set((state) => {
      console.log("post before: ", state.posts[1].vote_count);
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === id) {
          state.posts[i].vote_count += inc;
          break;
        }
      }
      console.log("post after: ", get().posts[1].vote_count);

      return {
        posts: get().posts,
      };
    });
  },

  addReaction: (post_id: number, emoji: string) => {
    set((state) => {
      const auth_name = get().name;

      // find post
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === post_id) {
          // only one reaction per owner
          // find reaction of owner then remove
          let reactions = state.posts[i].reactions;
          for (let j = 0; j < reactions.length; j++) {
            if (
              reactions[j].owner === auth_name ||
              reactions[j].owner === "You"
            ) {
              reactions.splice(j, 1);
            }
          }

          // add new reaction
          state.posts[i].reactions.unshift({
            owner: auth_name,
            reaction: emoji,
          });
        }
      }
    });
  },

  // getReactions retrieves reactions for a particular post
  // changes owned reaction into "You"
  getReactions: (post_id: number): Reaction[] => {
    const auth_name = get().name;

    // find reactions for the post
    let reactions: Reaction[] = [];
    const posts = get().posts;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === post_id) {
        reactions = posts[i].reactions;
      }
    }

    // iterate reactions and rename 'You'
    for (let i = 0; i < reactions.length; i++) {
      if (reactions[i].owner === auth_name) {
        reactions[i].owner = "You";
      }
    }

    return reactions;
  },

  // listReactionEmojis lists top 3 emojis based on all reactions on a post
  listReactionEmojis: (id: number): string[] => {
    // finding the reactions of the post
    let reactions: Reaction[] = [];
    const posts = get().posts;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        reactions = posts[i].reactions;
      }
    }

    // count number of occurence on each emoji
    let count = reactions.reduce<{ [k: string]: number }>((res, val) => {
      if (res[val.reaction]) {
        res[val.reaction]++;
      } else {
        res[val.reaction] = 1;
      }
      return res;
    }, {});

    let output = Object.entries(count)

      .sort((a, b) => b[1] - a[1]) // sort decsending
      .map((v) => v[0]); // extract the name field

    // only return top 3
    return output.slice(0, 3);
  },
});

export default createPostSlice;
