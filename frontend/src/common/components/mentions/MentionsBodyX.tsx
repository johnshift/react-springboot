import React, { Fragment } from "react";

import { Box, Link as MuiLink } from "@mui/material";
import useMentionsMetadata from "./useMentionsMetadata";

interface Props {
  body: string;
  isComment?: boolean;
}

const MentionsBodyX = (props: Props) => {
  const { body, isComment = false } = props;

  const metadata = useMentionsMetadata(body);

  return (
    <Box
      sx={{
        p: isComment ? 0 : 3,
        maxWidth: "54ch",
      }}
    >
      {metadata.map(({ text, url, newLine }, i) => {
        if (newLine) {
          return <br key={i} />;
        }
        if (!url) {
          return <Fragment key={i}>{text}</Fragment>;
        }
        return (
          <MuiLink
            href={url}
            key={i}
            sx={{ backgroundColor: "rgba(183, 28, 28, 0.1)" }}
            fontWeight="bold"
            underline="none"
          >
            {text}
          </MuiLink>
        );
      })}
    </Box>
  );
};

export default MentionsBodyX;
