import { Backdrop, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default PageLoader;
