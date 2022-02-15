import { Chip, IconButton, SvgIcon } from "@mui/material";
import { usePostContext } from ".";

const ShareIcon = () => (
  <SvgIcon>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M13 14h-2a8.999 8.999 0 00-7.968 4.81A10.136 10.136 0 013 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" />
  </SvgIcon>
);

const PostShareBtn = () => {
  const { isMobile } = usePostContext();

  return (
    <>
      {isMobile ? (
        <IconButton>
          <SvgIcon>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M13 14h-2a8.999 8.999 0 00-7.968 4.81A10.136 10.136 0 013 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" />
          </SvgIcon>
        </IconButton>
      ) : (
        <Chip
          label="Share"
          variant="outlined"
          icon={
            <SvgIcon>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13 14h-2a8.999 8.999 0 00-7.968 4.81A10.136 10.136 0 013 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z" />
            </SvgIcon>
          }
          sx={{ border: "transparent" }}
          component="button"
          clickable
        />
      )}
    </>
  );
};

export default PostShareBtn;
