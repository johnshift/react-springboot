import { PostContextProvider, usePostContext } from "./PostContext";
import PostComponent from "./Post";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostFeedback from "./PostFeedback";
import PostHeader from "./PostHeader";
import PostVotes from "./PostVotes";

import { Post, PostContext, Reaction } from "./types";

export default PostComponent;
export type { Post, PostContext, Reaction };
export {
  PostContextProvider,
  usePostContext,
  PostActions,
  PostBody,
  PostComments,
  PostFeedback,
  PostHeader,
  PostVotes,
};
