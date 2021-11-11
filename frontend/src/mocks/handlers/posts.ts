import { rest, DefaultRequestBody } from "msw";

import { db } from "../db";
import { ReactionT, PostT } from "../../types";
import { BACKEND_API_URL } from "../../constants";

export const postHandlers = [
  rest.get(BACKEND_API_URL + "/posts/:id", (req, res, ctx) => {
    return res(ctx.json(getPostById(Number(req.params.id))));
  }),

  rest.get<DefaultRequestBody, PostT[]>(
    BACKEND_API_URL + "/posts",
    (req, res, ctx) => {
      // todo: fetch recommended posts based on session id
      // assuming we are returning based on session id:

      const dbPosts = db.post.getAll();

      const posts: PostT[] = [];
      for (let p of dbPosts) {
        const owner = getPostOwner(p.id);
        const reactions: ReactionT[] = getPostReactions(p.id);

        posts.push({
          id: p.id,
          owner: owner as string,
          created: p.created,
          body: p.body,
          voteCount: p.voteCount,
          commentCount: p.commentCount,
          reactions: reactions,
        });
      }

      return res(ctx.delay(4000), ctx.json(posts));
    }
  ),
];

const getPostOwner = (postId: number): string => {
  let owner = db.user.findFirst({
    where: {
      id: {
        equals: postId,
      },
    },
    strict: true,
  })?.name;

  return owner as string;
};

const getPostReactions = (postId: number): ReactionT[] => {
  const dbReactions = db.reaction.findMany({
    where: {
      refId: {
        equals: postId,
      },
      type: {
        equals: 0,
      },
    },
  });

  const reactions: ReactionT[] = [];
  for (let r of dbReactions) {
    let reactionOwner = db.user.findFirst({
      where: {
        id: {
          equals: r.ownerId,
        },
      },
      strict: true,
    })?.name;

    reactions.push({
      id: r.id,
      owner: reactionOwner as string,
      reaction: r.reaction,
    });
  }

  // console.log("reactions: ", reactions);

  return reactions;
};

const getPostById = (postId: number): PostT => {
  let dbPost = db.post.findFirst({
    where: {
      id: {
        equals: postId,
      },
    },
  });

  let owner = getPostOwner(dbPost?.id as number);

  const reactions = getPostReactions(dbPost?.id as number);

  // console.log("reactions: ", reactions);

  const post: PostT = {
    id: postId,
    owner: owner,
    created: dbPost?.created as string,
    body: dbPost?.body as string,
    voteCount: dbPost?.voteCount as number,
    commentCount: dbPost?.commentCount as number,
    reactions: reactions,
  };

  // console.log("post: ", post);

  return post;
};
