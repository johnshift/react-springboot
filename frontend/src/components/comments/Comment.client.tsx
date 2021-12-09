// import Head from "next/head";

type CommentT = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const Comment = ({ id, postId, name, email, body }: CommentT) => {
  return (
    <>
      {/* <Head>
        <title>Veils App</title>
        <meta name="description" content="Share your secrets anonymously" />
      </Head> */}
      <div
        style={{
          width: "600px",
          height: "250px",
          border: "1px solid red",
          margin: "5px",
        }}
      >
        <p className="is-size-1">id: {id}</p>
        <p>postId: {postId}</p>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>body: {body}</p>
      </div>
    </>
  );
};

export default Comment;
