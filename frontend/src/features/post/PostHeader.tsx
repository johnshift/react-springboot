import { Avatar, Box, IconButton, Typography } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";

const PostHeader = () => {
  return (
    <Box sx={{ display: "flex", color: "#757575", mb: 1 }}>
      <Box sx={{ pr: 2 }}>
        <Avatar alt="John Ballesteros" sx={{ width: 48, height: 48 }}>
          JB
        </Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>John Ballesteros</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption">1 hour ago</Typography>
          <PublicIcon sx={{ ml: "8px", fontSize: "16px" }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", pl: 2 }}>
        <IconButton size="large">
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostHeader;
