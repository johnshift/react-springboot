import { PostContextProvider, usePostContext } from "./PostContext";
import PostComponent from "./Post";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";
import PostReactions from "./PostReactions";
import PostVotes from "./PostVotes";
import PostVoteBtns from "./PostVoteBtns";
import PostCommentsBtn from "./PostCommentsBtn";
import PostShareBtn from "./PostShareBtn";
import PostReactBtn from "./PostReactBtn";

import { Post, PostContext, Reaction } from "./types";

export default PostComponent;
export type { Post, PostContext, Reaction };
export {
  PostContextProvider,
  usePostContext,
  PostActions,
  PostBody,
  PostComments,
  PostHeader,
  PostVotes,
  PostVoteBtns,
  PostReactions,
  PostCommentsBtn,
  PostShareBtn,
  PostReactBtn,
};
