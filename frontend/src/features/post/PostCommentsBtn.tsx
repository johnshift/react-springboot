import { Badge, Chip, IconButton, SvgIcon } from "@mui/material";

import { usePostContext } from ".";
import useDeviceWidth from "../../common/hooks/useDeviceWidth";

const CommentIcon = () => (
  <SvgIcon>
    <path d="M8 11a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm-4-9A10 10 0 002 12a9.89 9.89 0 002.26 6.33l-2 2a1 1 0 00-.21 1.09A1 1 0 003 22h9a10 10 0 000-20zm0 18H5.41l.93-.93a1 1 0 00.3-.71 1 1 0 00-.3-.7A8 8 0 1112 20z" />
  </SvgIcon>
);

const PostCommentsBtn = () => {
  const { showComments, setShowComments } = usePostContext();
  const { xs } = useDeviceWidth();

  return (
    <>
      {xs ? (
        <IconButton onClick={() => setShowComments(!showComments)}>
          <Badge badgeContent={4} color="secondary">
            <CommentIcon />
          </Badge>
        </IconButton>
      ) : (
        <Chip
          label="5 comments"
          clickable
          variant="outlined"
          sx={{ border: "transparent" }}
          icon={<CommentIcon />}
          onClick={() => setShowComments(!showComments)}
        />
      )}
    </>
  );
};

export default PostCommentsBtn;
