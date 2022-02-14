import { Box, Link as MuiLink } from "@mui/material";

import { usePostContext } from "./PostContext";
import { Fragment } from "react";
import useMentionsMetadata from "../../common/components/mentions/useMentionsMetadata";
import MentionsBodyX from "../../common/components/mentions/MentionsBodyX";

const PostBody = () => {
  const { body } = usePostContext();

  const metadata = useMentionsMetadata(body);
  console.log("metadata =", metadata);

  return <MentionsBodyX body={body} />;
};

export default PostBody;
