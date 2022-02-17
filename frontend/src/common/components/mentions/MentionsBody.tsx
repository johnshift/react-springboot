import React, { Fragment } from "react";
import Link from "next/link";
import { Box, Link as MuiLink } from "@mui/material";

import useMentionsMetadata from "./useMentionsMetadata";
interface Props {
  body: string;
  isComment?: boolean;
}

const MentionsBody = (props: Props) => {
  const { body, isComment = false } = props;

  const metadata = useMentionsMetadata(body);

  return (
    <Box
      sx={{
        p: isComment ? 0 : 2,
        maxWidth: "54ch",
        // border: "1px solid red",
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
          <Link href={url} key={i} passHref>
            <MuiLink
              sx={{ backgroundColor: "rgba(183, 28, 28, 0.1)" }}
              fontWeight="bold"
              underline="none"
            >
              {text}
            </MuiLink>
          </Link>
        );
      })}
    </Box>
  );
};

export default MentionsBody;
