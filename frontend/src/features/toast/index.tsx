import { forwardRef, SyntheticEvent, useEffect } from "react";
import { Alert as MuiAlert, Snackbar, AlertProps } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";

import { useAppSelector, useAppDispatch } from "../../store";
import { toastClose, newToast } from "./toastSlice";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
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
  } else if (props.severity === "warning") {
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
      sx={_sx}
      {...props}
    />
  );
});

const Toast = ({ ignoreClickAway = true }) => {
  const { msg, severity, show, duration, params } = useAppSelector(
    (state) => state.toast.value
  );
  const dispatch = useAppDispatch();

  const onClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway" && ignoreClickAway) {
      return;
    }

    dispatch(toastClose());
  };

  useEffect(() => {
    let delay: NodeJS.Timeout;

    const clear = () => {
      clearTimeout(delay);
    };

    if (msg === TOAST_MSG_LOADING) {
      clear();
      delay = setTimeout(() => {
        dispatch(
          newToast({
            severity: "warning",
            msg: TOAST_MSG_LONGER,
            duration: params.stmhErrDelay,
          })
        );
      }, params.longDelay);
    } else if (msg === TOAST_MSG_LONGER) {
      clear();
      delay = setTimeout(() => {
        dispatch(
          newToast({
            severity: "error",
            msg: MSG_SOMETHING_WENT_WRONG,
            duration: null, // do not hide smth-went-wrong error
          })
        );
      }, params.stmhErrDelay);
    } else {
      clear();
    }

    return () => {
      clearTimeout(delay);
    };
  }, [dispatch, msg, params.longDelay, params.stmhErrDelay]);

  return (
    <Snackbar
      key={msg}
      open={show}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={duration}
      resumeHideDuration={-1}
    >
      <Alert onClose={onClose} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
