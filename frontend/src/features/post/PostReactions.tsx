import { Chip, Link as MuiLink, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { Reaction, usePostContext } from ".";
import useDeviceWidth from "../../common/hooks/useDeviceWidth";

type EmojiCount = {
  [key: string]: number;
};

const PostReactions = () => {
  const { reactions } = usePostContext();
  const { xs, mdMax, lg } = useDeviceWidth();

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

  const firstTwoNames = `${reactions[0].name}, ${reactions[1].name}`;
  const emoteInfo = mdMax
    ? `${firstTwoNames} ...`
    : `${firstTwoNames} and ${reactions.length - 2} others`;

  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: "100%",
        alignItems: "center",
      }}
    >
      <Chip
        label={topThreeEmotes}
        clickable
        variant="outlined"
        sx={{ border: "transparent" }}
        size="small"
      />
      <MuiLink
        component="button"
        variant="body2"
        color="#66676B"
        underline="none"
        // fontWeight="bold"
        sx={{ ":hover": { textDecoration: "underline" } }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            maxWidth: xs ? "160px" : lg ? "auto" : "200px",
          }}
          noWrap
        >
          {emoteInfo}
        </Typography>
      </MuiLink>
    </Stack>
  );
};

export default PostReactions;
