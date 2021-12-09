import type { NextPage } from "next";
import { Suspense } from "react";
import AllCommentsSpinner from "../components/comments/AllCommentsSpinner";
import Comment from "../components/comments/Comment.client";
import CommentSpinner from "../components/comments/CommentSpinner";
import Page from "../components/layout/Page";
import { DEFAULT_META_DESCRIPTION } from "../lib/constants";
import fetchDataWithDelay from "../lib/fetch/fetchDataWithDelay";
import cachedFetch from "../lib/fetch/cachedFetch";

type PostCommentT = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const CommentWithData = ({ id }: { id: number }) => {
  const url = `https://jsonplaceholder.typicode.com/comments/${id}`;

  const comment = cachedFetch(url, () => fetchDataWithDelay(url));

  return comment != null ? (
    <Comment {...comment} />
  ) : (
    <p>comment #{id} not found.</p>
  );
};

const AllComents = ({ postId }: { postId: number }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  const comments = cachedFetch(url, () => fetchDataWithDelay(url));

  return (
    <>
      {comments.map(({ id }: PostCommentT, i: number) => {
        return (
          <Suspense key={i} fallback={<CommentSpinner id={id} />}>
            <CommentWithData id={id} />
          </Suspense>
        );
      })}
    </>
  );
};

const SCDemo: NextPage = () => {
  return (
    <Page>
      <main>
        <h1 className="text-8xl text-red-500">Comments:</h1>
        <Suspense fallback={<AllCommentsSpinner />}>
          <AllComents postId={1} />
        </Suspense>
      </main>
    </Page>
  );
};

export default SCDemo;
