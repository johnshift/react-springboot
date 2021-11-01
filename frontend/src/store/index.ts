import create, { GetState, SetState } from "zustand";

export function prettyDate(dateStr: string): string {
  var seconds = Math.floor(
    (new Date().valueOf() - Date.parse(dateStr).valueOf()) / 1000
  );

  if (seconds <= 0) {
    return "just now";
  }

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;

  return Math.floor(interval) + " minutes ago";
  // if (interval > 1) {
  //   return Math.floor(interval) + " minutes ago";
  // }
  // return Math.floor(seconds) + " seconds";
}

export type reactionType = {
  owner: string;
  reaction: string;
};

export type PostProps = {
  id: number;
  owner: string;
  created: string;
  body: string;
  vote_count: number;
  comment_count: number;
  reactions: reactionType[];
};

type Store = {
  posts: PostProps[];
  addPost: (post: PostProps) => void;
  updatePostVote: (id: number, inc: number) => void;
  addReaction: (post_id: number, name: string, emoji: string) => void;

  auth_username: string;
  auth_name: string;
};

const createPostSlice = (set: SetState<Store>, get: GetState<Store>) => ({
  posts: [
    {
      id: 0,
      owner: "Ben Tong",
      created: prettyDate("2021-10-26T18:03:14.735Z"),
      body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. ❓ ❗
  `,
      vote_count: 34,
      comment_count: 8,
      reactions: [{ owner: "Jane Doe", reaction: "👄" }],
    },
    {
      id: 1,
      owner: "Jane Doe",
      created: prettyDate("2021-10-18T18:03:14.735Z"),
      body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤣 🤣
    
    Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💔 💔
    
    Aenean ac sapien felis. 🍆 💦 Sed dapibus risus ut convallis porttitor. Ut ipsum justo, imperdiet in eros quis, interdum aliquam augue.
  `,
      vote_count: 26,
      comment_count: 3,
      reactions: [
        { owner: "John Smith", reaction: "🍆" },
        { owner: "Jane Doe", reaction: "💦" },
        { owner: "grapeapple", reaction: "🤡" },
      ],
    },

    {
      id: 2,
      owner: "John Smith",
      created: prettyDate("2021-08-18T18:03:14.735Z"),
      body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤭
    
    Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💕 
  `,
      vote_count: 81,
      comment_count: 25,
      reactions: [
        { owner: "grapeapple", reaction: "💖" },
        { owner: "Jane Doe", reaction: "💞" },
      ],
    },
  ],
  addPost: (post: PostProps) => {
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

const createAuthSlice = (_set: SetState<Store>, _get: GetState<Store>) => ({
  auth_username: "user_1",
  auth_name: "John Smith",
});

const useStore = create<Store>((set, get) => ({
  ...createPostSlice(set, get),
  ...createAuthSlice(set, get),
}));

export default useStore;
