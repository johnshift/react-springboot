import MentionsBody from "../../common/components/mentions/MentionsBody";

import { usePostContext } from ".";

const PostBody = () => {
  const { body, isMobile } = usePostContext();

  return <MentionsBody body={body} isMobile={isMobile} />;
};

export default PostBody;
