import { useMediaQuery, useTheme } from "@mui/material";

const useDeviceSize = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  return { isXs, isSm, isLg };
};

export default useDeviceSize;
