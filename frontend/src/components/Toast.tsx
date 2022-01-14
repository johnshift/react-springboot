import { forwardRef, SyntheticEvent } from "react";

import {
  Alert as MuiAlert,
  Snackbar,
  SnackbarOrigin,
  AlertColor,
  AlertProps,
  SnackbarCloseReason,
  SvgIcon,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
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
      sx={
        props.severity === "error"
          ? {
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
            }
          : {}
      }
      {...props}
    />
  );
});

type alertOnClose = (event: SyntheticEvent<Element, Event>) => void;
type snackbarOnClose = (
  event: Event | SyntheticEvent<any, Event>,
  reason: SnackbarCloseReason
) => void;

interface Props {
  show: boolean;
  onClose: alertOnClose & snackbarOnClose;
  severity: AlertColor;
  msg: string;
  vertical?: SnackbarOrigin["vertical"];
  horizontal?: SnackbarOrigin["horizontal"];
}

const Toast = ({
  show,
  onClose,
  severity,
  msg,
  vertical = "bottom",
  horizontal = "center",
}: Props) => {
  return (
    <Snackbar
      key={msg}
      open={show}
      autoHideDuration={3000}
      resumeHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={onClose} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
