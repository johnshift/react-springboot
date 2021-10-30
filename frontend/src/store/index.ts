import create, { GetState, SetState } from "zustand";

function prettyDate(dateStr: string): string {
  var seconds = Math.floor(
    (new Date().valueOf() - Date.parse(dateStr).valueOf()) / 1000
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export type reactionType = {
  owner: string;
  reaction: string;
};

export type PostProps = {
  owner: string;
  created: string;
  body: string;
  vote_count: number;
  comment_count: number;
  reactions: reactionType[];
};

type Store = {
  posts: PostProps[];
};

const createPostSlice = (_set: SetState<Store>, _get: GetState<Store>) => ({
  posts: [
    {
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
});

const useStore = create<Store>((set, get) => ({
  ...createPostSlice(set, get),
}));

export default useStore;
