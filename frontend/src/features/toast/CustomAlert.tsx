import { forwardRef } from "react";
import Alert, { AlertProps } from "@mui/material/Alert";

import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

const CustomAlert = forwardRef<HTMLDivElement, AlertProps>(function CustomAlert(
  props,
  ref
) {
  let _sx = undefined;

  if (props.severity === "error") {
    _sx = {
      animation: "0.6s shake",
      "@keyframes shake": {
        "40%": {
          transform: "translateX(0px)",
        },
        "55%": {
          transform: "translateX(6px)",
        },
        "60%": {
          transform: "translateX(-6px)",
        },
        "80%": {
          transform: "translateX(4px)",
        },
        "85%": {
          transform: "translateX(-4px)",
        },
        "90%": {
          transform: "translateX(2px)",
        },
        "95%": {
          transform: "translateX(-2px)",
        },
        "100%": {
          transform: "translateX(0px)",
        },
      },
    };
  }

  if (props.severity === "warning") {
    _sx = {
      animation: "1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse",
      "@keyframes pulse": {
        "0%, 100%": {
          opacity: 1,
        },
        "50%": {
          opacity: 0.6,
        },
      },
    };
  }

  return (
    <Alert
      elevation={6}
      ref={ref}
      variant="filled"
      iconMapping={{
        success: <CheckIcon fontSize="inherit" />,
        info: <InfoIcon fontSize="inherit" />,
        warning: (
          <CachedIcon
            fontSize="inherit"
            sx={{
              animation: "1s linear infinite spin",
              "@keyframes spin": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
        ),
        error: <ErrorIcon fontSize="inherit" />,
      }}
      sx={_sx}
      {...props}
    />
  );
});

export default CustomAlert;
