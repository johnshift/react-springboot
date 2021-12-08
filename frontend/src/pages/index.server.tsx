import type { NextPage } from "next";
import { Suspense } from "react";
import AllCommentsSpinner from "../components/AllCommentsSpinner";
import Comment from "../components/Comment.client";
import CommentSpinner from "../components/CommentSpinner";
import Page from "../components/Page.client";
import fetchDataWithDelay from "../lib/fetchDataWithDelay";
import useData from "../lib/useData";

type PostCommentT = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const CommentWithData = ({ id }: { id: number }) => {
  const url = `https://jsonplaceholder.typicode.com/comments/${id}`;

  const comment = useData(url, () => fetchDataWithDelay(url));

  return comment != null ? (
    <Comment {...comment} />
  ) : (
    <p>comment #{id} not found.</p>
  );
};

const AllComents = ({ postId }: { postId: number }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  const comments = useData(url, () => fetchDataWithDelay(url));

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

const Home: NextPage = () => {
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

export default Home;
