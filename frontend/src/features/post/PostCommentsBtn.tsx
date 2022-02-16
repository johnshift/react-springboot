import { Badge, Button, IconButton, SvgIcon, Typography } from "@mui/material";

import { usePostContext } from ".";
import useDeviceSize from "../../common/hooks/useDeviceSize";

const CommentIcon = () => (
  <SvgIcon fontSize="small">
    {/* <path d="M8 11a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm-4-9A10 10 0 002 12a9.89 9.89 0 002.26 6.33l-2 2a1 1 0 00-.21 1.09A1 1 0 003 22h9a10 10 0 000-20zm0 18H5.41l.93-.93a1 1 0 00.3-.71 1 1 0 00-.3-.7A8 8 0 1112 20z" /> */}
    <path d="M9 22a1 1 0 01-1-1v-3H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6z" />
  </SvgIcon>
);

const PostCommentsBtn = () => {
  const { showComments, setShowComments } = usePostContext();

  const { deviceWidth } = useDeviceSize();

  return (
    <>
      {deviceWidth < 360 ? (
        <IconButton
          onClick={() => setShowComments(!showComments)}
          sx={{ pl: 3 }}
        >
          <Badge
            badgeContent={4}
            color="secondary"
            sx={{
              ".MuiBadge-badge": {
                fontSize: "10px",
                height: "14px",
                minWidth: "14px",
                p: 0,
              },
            }}
          >
            <CommentIcon />
          </Badge>
        </IconButton>
      ) : (
        <Button
          size="small"
          variant="text"
          startIcon={<CommentIcon />}
          color="secondary"
          sx={{ textTransform: "none" }}
          onClick={() => setShowComments(!showComments)}
        >
          <Typography fontSize="small">5 comments</Typography>
        </Button>
      )}
    </>
  );
};

export default PostCommentsBtn;
