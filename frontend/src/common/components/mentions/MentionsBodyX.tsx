import React, { Fragment } from "react";

import { Box, Link as MuiLink } from "@mui/material";
import useMentionsMetadata from "./useMentionsMetadata";

interface Props {
  body: string;
  isPostBody?: boolean;
}

const MentionsBodyX = (props: Props) => {
  const { body } = props;

  const metadata = useMentionsMetadata(body);

  return (
    <Box sx={{ border: "1px solid red", p: 3, maxWidth: "48ch" }}>
      {metadata.map(({ text, url }, i) =>
        !url ? (
          <Fragment key={i}>{text}</Fragment>
        ) : (
          <MuiLink
            href={url}
            key={i}
            sx={{ backgroundColor: "rgba(183, 28, 28, 0.1)" }}
            fontWeight="bold"
          >
            {text}
          </MuiLink>
        )
      )}
    </Box>
  );
};

export default MentionsBodyX;
