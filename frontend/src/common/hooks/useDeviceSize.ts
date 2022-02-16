import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const useDeviceSize = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [deviceWidth, setDeviceWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
    };

    if (window) {
      window.addEventListener("resize", handleResize);
    }
  });

  return { isXs, isSm, isLg, deviceWidth };
};

export default useDeviceSize;
