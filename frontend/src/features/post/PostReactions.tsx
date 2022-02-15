import { Box, Chip, Link as MuiLink, Typography } from "@mui/material";
import { useMemo } from "react";
import { Reaction, usePostContext } from ".";

type EmojiCount = {
  [key: string]: number;
};

const PostReactions = () => {
  const { isMobile, reactions } = usePostContext();

  const topThreeEmotes = useMemo(() => {
    const counts = reactions.reduce((acc, reaction: Reaction) => {
      acc[reaction.emoji] = acc[reaction.emoji] ? acc[reaction.emoji] + 1 : 1;
      return acc;
    }, {} as EmojiCount);
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return Object.keys(sorted)
      .map((emoji, i) => (i < 3 ? emoji : null))
      .filter((emoji) => !!emoji)
      .join("");
  }, [reactions]);

  const emoteInfo = isMobile
    ? `${reactions.length} emotes`
    : `${reactions[0].name}, ${reactions[1].name} and ${
        reactions.length - 2
      } others`;

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        maxWidth: "100%",
      }}
    >
      <Chip
        label={topThreeEmotes}
        clickable
        variant="outlined"
        sx={{ border: "transparent" }}
      />
      <MuiLink
        component="button"
        variant="body2"
        color="#66676B"
        underline="none"
        // fontWeight="bold"
        sx={{ ":hover": { textDecoration: "underline" } }}
      >
        <Typography sx={{ fontSize: "13px" }} noWrap>
          {emoteInfo}
        </Typography>
      </MuiLink>
    </Box>
  );
};

export default PostReactions;
