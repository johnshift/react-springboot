import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Chip,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import getInitials from "../../lib/getInitials";
import useDeviceSize from "../../common/hooks/useDeviceSize";

import { Reaction, usePostContext } from ".";
import { useAppSelector } from "../../store";

type EmojiCount = {
  [key: string]: number;
};

const PostReactions = () => {
  const { name: profileName } = useAppSelector((state) => state.userInfo);
  const { reactions, userReaction } = usePostContext();
  const { isSm, deviceWidth } = useDeviceSize();
  const router = useRouter();

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

  const reactionsFiltered = useMemo(() => {
    return reactions.filter((reaction) => reaction.name !== profileName);
  }, [profileName, reactions]);

  const firstTwoNames = userReaction
    ? `You, ${reactionsFiltered[0].name}`
    : `${reactionsFiltered[0].name}, ${reactionsFiltered[1].name}`;

  const emoteInfo = isSm
    ? `${firstTwoNames} ...`
    : `${firstTwoNames} and ${reactions.length - 2} others`;

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          maxWidth: "100%",
          alignItems: "center",
          py: 1,
        }}
      >
        <Chip
          label={topThreeEmotes}
          variant="outlined"
          sx={{ border: "transparent" }}
          size="small"
          onClick={openDialog}
        />
        <Typography
          color="#66676B"
          variant="body2"
          sx={{
            fontSize: "13px",
            maxWidth:
              deviceWidth < 360 ? "20ch" : deviceWidth < 400 ? "25ch" : "auto",
            ":hover": { textDecoration: "underline", cursor: "pointer" },
          }}
          onClick={openDialog}
          noWrap
        >
          {emoteInfo}
        </Typography>
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <List sx={{ maxHeight: "400px" }}>
          {reactions.map(({ name, emoji, id }) => (
            <ListItem
              key={name}
              button
              sx={{ py: 1, minWidth: "300px" }}
              onClick={() => router.push(`/${id}`)}
            >
              <ListItemAvatar>
                <Badge
                  badgeContent={emoji}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  overlap="circular"
                  sx={{
                    ".MuiBadge-badge": {
                      fontSize: "18px",
                      right: 5,
                      bottom: 8,
                    },
                  }}
                >
                  <Avatar alt={name} sx={{ width: 48, height: 48 }}>
                    {getInitials(name)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText primary={name} sx={{ pl: 2 }} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default PostReactions;
