import { Button, IconButton, SvgIcon } from "@mui/material";

import useDeviceSize from "../../common/hooks/useDeviceSize";

const ShareIcon = () => (
  <SvgIcon>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M13 14h-2a8.999 8.999 0 00-7.968 4.81A10.136 10.136 0 013 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" />
  </SvgIcon>
);

const PostShareBtn = () => {
  const { isSm } = useDeviceSize();

  return (
    <>
      {isSm ? (
        <IconButton>
          <ShareIcon />
        </IconButton>
      ) : (
        <Button
          // size="small"
          variant="text"
          startIcon={<ShareIcon />}
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Share
        </Button>
      )}
    </>
  );
};

export default PostShareBtn;
