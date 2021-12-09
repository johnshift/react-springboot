const CommentSpinner = ({ id }: { id: number }) => {
  return (
    <div
      style={{
        width: "600px",
        height: "250px",
        border: "1px solid red",
        margin: "5px",
      }}
    >
      <p>loading comment #{id}</p>
    </div>
  );
};

export default CommentSpinner;
