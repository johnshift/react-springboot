import { usePostContext } from "./PostContext";
import MentionsBody from "../../common/components/mentions/MentionsBody";

const PostBody = () => {
  const { body, isMobile } = usePostContext();

  return <MentionsBody body={body} isMobile={isMobile} />;
};

export default PostBody;
