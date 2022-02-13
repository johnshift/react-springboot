import { Box } from "@mui/material";

import { usePostContext } from "./PostContext";
import MentionsBody from "../../common/components/mentions/MentionsBody";

const PostBody = () => {
  const { body } = usePostContext();

  return (
    <Box sx={{ mb: 1 }}>
      <MentionsBody body={body} isPostBody />
    </Box>
  );
};

export default PostBody;
