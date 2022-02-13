import { Box, IconButton, Popover, PopoverOrigin } from "@mui/material";
import { emojis } from "./emojis";

interface Props {
  anchorEl: HTMLButtonElement | null;

  vertical?: PopoverOrigin["vertical"];
  horizontal?: PopoverOrigin["horizontal"];

  onClose: () => void;
}

const EmojiPopover = (props: Props) => {
  const { anchorEl, onClose, vertical = "top", horizontal = "right" } = props;

  return (
    <Popover
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      transformOrigin={{
        vertical,
        horizontal,
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gap={2}
        sx={{ maxHeight: "300px" }}
      >
        {emojis.map((emoji) => (
          <IconButton
            aria-label={emoji.label}
            key={emoji.label}
            color="inherit"
          >
            {emoji.symbol}
          </IconButton>
        ))}
      </Box>
    </Popover>
  );
};

export default EmojiPopover;
