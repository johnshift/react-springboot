import MentionsBody from "../../common/components/mentions/MentionsBody";

import { usePostContext } from ".";

const PostBody = () => {
  const { body } = usePostContext();

  return <MentionsBody body={body} />;
};

export default PostBody;
