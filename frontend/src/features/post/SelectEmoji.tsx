import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export const emojis = [
  {
    symbol: "🙂",
    label: "slightly smiling face",
  },
  {
    symbol: "😆",
    label: "grinning squinting face",
  },
  {
    symbol: "🤣",
    label: "rolling on the floor laughing",
  },
  {
    symbol: "😅",
    label: "grinning face with sweat",
  },
  {
    symbol: "😁",
    label: "beaming face with smiling eyes",
  },
  {
    symbol: "😊",
    label: "smiling face with smiling eyes",
  },
  {
    symbol: "😳",
    label: "flushed face",
  },
  {
    symbol: "🤭",
    label: "face with hand over mouth",
  },
  {
    symbol: "😚",
    label: "kissing face with closed eyes",
  },
  {
    symbol: "🤗",
    label: "smiling face with open hands",
  },
  {
    symbol: "😘",
    label: "face blowing a kiss",
  },
  {
    symbol: "🥰",
    label: "smiling face with hearts",
  },
  {
    symbol: "😍",
    label: "smiling face with heart-eyes",
  },
  {
    symbol: "🤩",
    label: "star-struck",
  },
  {
    symbol: "😇",
    label: "smiling face with halo",
  },
  {
    symbol: "🤫",
    label: "shushing face",
  },
  {
    symbol: "🥲",
    label: "smiling face with tear",
  },
  {
    symbol: "😉",
    label: "winking face",
  },
  {
    symbol: "😝",
    label: "squinting face with tongue",
  },
  {
    symbol: "🤪",
    label: "zany face",
  },
  {
    symbol: "🤤",
    label: "drooling face",
  },
  {
    symbol: "😎",
    label: "smiling face with sunglasses",
  },
  {
    symbol: "😲",
    label: "astonished face",
  },
  {
    symbol: "🤯",
    label: "exploding head",
  },
  {
    symbol: "🥳",
    label: "partying face",
  },
  {
    symbol: "🤔",
    label: "thinking face",
  },
  {
    symbol: "🤨",
    label: "face with raised eyebrow",
  },
  {
    symbol: "😐",
    label: "neutral face",
  },
  {
    symbol: "😒",
    label: "unamused face",
  },
  {
    symbol: "🙄",
    label: "face exhaling",
  },
  {
    symbol: "😔",
    label: "pensive face",
  },
  {
    symbol: "😟",
    label: "worried face",
  },
  {
    symbol: "🤧",
    label: "sneezing face",
  },
  {
    symbol: "😷",
    label: "face with medical mask",
  },
  {
    symbol: "🤮",
    label: "face vomiting",
  },
  {
    symbol: "😫",
    label: "tired face",
  },
  {
    symbol: "😭",
    label: "loudly crying face",
  },
  {
    symbol: "😨",
    label: "fearful face",
  },
  {
    symbol: "😱",
    label: "face screaming in fear",
  },
  {
    symbol: "😖",
    label: "confounded face",
  },
  {
    symbol: "😠",
    label: "angry face",
  },
  {
    symbol: "😤",
    label: "face with steam from nose",
  },
  {
    symbol: "😡",
    label: "pouting face",
  },
  {
    symbol: "🤬",
    label: "face with symbols on mouth",
  },
  {
    symbol: "😈",
    label: "angry face with horns",
  },
  {
    symbol: "💖",
    label: "sparkling heart",
  },
  {
    symbol: "💔",
    label: "broken heart",
  },
  {
    symbol: "💕",
    label: "two hearts",
  },
  {
    symbol: "💞",
    label: "revolving hearts",
  },
  {
    symbol: "💓",
    label: "beating heart",
  },
  {
    symbol: "💩",
    label: "pile of poo",
  },
  {
    symbol: "🤡",
    label: "clown face",
  },
  {
    symbol: "🍆",
    label: "eggplant",
  },
  {
    symbol: "💤",
    label: "zzz",
  },
  {
    symbol: "💦",
    label: "sweat droplets",
  },
  {
    symbol: "👉",
    label: "backhand index pointing right",
  },
  {
    symbol: "👌",
    label: "OK hand",
  },
  {
    symbol: "👍",
    label: "thumbs up",
  },
  {
    symbol: "🤝",
    label: "handshake",
  },
  {
    symbol: "🙏",
    label: "folded hands",
  },
  {
    symbol: "✌",
    label: "peace hand",
  },
  {
    symbol: "🤘",
    label: "rock-and-roll gesture",
  },
  {
    symbol: "👎",
    label: "thumbs down",
  },
  {
    symbol: "🤞",
    label: "crossed fingers",
  },
  {
    symbol: "👊",
    label: "left-facing fist",
  },
  {
    symbol: "✨",
    label: "sparkles",
  },
  {
    symbol: "🎉",
    label: "party popper",
  },
  {
    symbol: "🎊",
    label: "confetti ball",
  },
  {
    symbol: "🏅",
    label: "medal",
  },
  {
    symbol: "🏆",
    label: "trophy",
  },
  {
    symbol: "🐷",
    label: "pig face",
  },
  {
    symbol: "🐽",
    label: "pig nose",
  },
  {
    symbol: "🔥",
    label: "fire",
  },
  {
    symbol: "📷",
    label: "camera",
  },
  {
    symbol: "🔞",
    label: "no one under eighteen",
  },
  {
    symbol: "👄",
    label: "mouth",
  },
  {
    symbol: "👅",
    label: "tongue",
  },
  {
    symbol: "💧",
    label: "droplet",
  },
  {
    symbol: "❓",
    label: "red question mark",
  },
  {
    symbol: "❗",
    label: "red exclamation mark",
  },
  {
    symbol: "🤦",
    label: "person facepalming",
  },
  {
    symbol: "🤷‍♂️",
    label: "man shrugging",
  },
  {
    symbol: "🤷‍♀️",
    label: "woman shrugging",
  },
  {
    symbol: "🙅‍♂️",
    label: "man gesturing NO",
  },
  {
    symbol: "🙅‍♀️",
    label: "woman gesturing NO",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  cursorPos: number;
}

const SelectEmoji = ({
  open,
  onClose,
  postBody,
  setPostBody,
  cursorPos,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const gridTemplate = `repeat(${isMobile ? "4" : "5"}, 1fr)`;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Select Emoji</DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns={gridTemplate}
          gap={2}
          sx={{ maxHeight: "300px", overflow: "auto" }}
        >
          {emojis.map((emoji) => (
            <IconButton
              aria-label={emoji.label}
              key={emoji.label}
              color="inherit"
              onClick={() => {
                const before = postBody.trim().substring(0, cursorPos);
                const after = postBody
                  .trim()
                  .substring(cursorPos, postBody.length);
                setPostBody(`${before} ${emoji.symbol} ${after}`);
                onClose();
              }}
            >
              {emoji.symbol}
            </IconButton>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SelectEmoji;
