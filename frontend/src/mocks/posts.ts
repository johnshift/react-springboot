import { prettyDate } from "../utils";

export const posts = [
  {
    id: 1,
    ownerId: 4,
    created: prettyDate("2021-10-26T18:03:14.735Z"),
    body: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤣 🤣
      
      Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💔 💔
      
      Aenean ac sapien felis. 🍆 💦 Sed dapibus risus ut convallis porttitor. Ut ipsum justo, imperdiet in eros quis, interdum aliquam augue.
    `,
    voteCount: 34,
    commentCount: 8,
  },
  {
    id: 2,
    ownerId: 2,
    created: prettyDate("2021-03-18T18:03:14.735Z"),
    body: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. ❓ ❗
    `,
    voteCount: 26,
    commentCount: 3,
  },
  {
    id: 3,
    ownerId: 1,
    created: prettyDate("2021-08-18T18:03:14.735Z"),
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤭
    
    Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💕 
  `,
    voteCount: 81,
    commentCount: 25,
  },
];

// export const mockedPosts = [
//   {
//     id: 0,
//     owner: "Ben Tong",
//     created: prettyDate("2021-10-26T18:03:14.735Z"),
//     body: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. ❓ ❗
//   `,
//     vote_count: 34,
//     comment_count: 8,
//     reactions: [{ owner: "Jane Doe", reaction: "👄" }],
//   },
//   {
//     id: 1,
//     owner: "Jane Doe",
//     created: prettyDate("2021-10-18T18:03:14.735Z"),
//     body: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤣 🤣

//     Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💔 💔

//     Aenean ac sapien felis. 🍆 💦 Sed dapibus risus ut convallis porttitor. Ut ipsum justo, imperdiet in eros quis, interdum aliquam augue.
//   `,
//     vote_count: 26,
//     comment_count: 3,
//     reactions: [
//       { owner: "John Smith", reaction: "🍆" },
//       { owner: "Jane Doe", reaction: "💦" },
//       { owner: "grapeapple", reaction: "🤡" },
//     ],
//   },

//   {
//     id: 2,
//     owner: "John Smith",
//     created: prettyDate("2021-08-18T18:03:14.735Z"),
//     body: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla est eget massa tincidunt iaculis. 🤭

//     Aenean aliquet velit nulla, a placerat ligula rhoncus eu. Maecenas ut ultricies urna. Quisque sed dictum augue. Donec urna quam,  varius eget libero non, sagittis tempor eros. 💕
//   `,
//     vote_count: 81,
//     comment_count: 25,
//     reactions: [
//       { owner: "grapeapple", reaction: "💖" },
//       { owner: "Jane Doe", reaction: "💞" },
//     ],
//   },
// ];
