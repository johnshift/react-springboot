import { Snackbar } from "@mui/material";
import { SyntheticEvent } from "react";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import CustomAlert from "./CustomAlert";
import useToast from "./useToast";

const Toast = ({ ignoreClickAway = true }) => {
  const { show, msg, severity, toastClose } = useToast();

  const onClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway" && ignoreClickAway) {
      return;
    }

    toastClose();
  };

  const isLoading = msg === TOAST_MSG_LOADING || msg === TOAST_MSG_LONGER;
  const onCloseFn = isLoading ? undefined : onClose;

  return (
    <Snackbar
      key={msg}
      open={show}
      onClose={onCloseFn}
      TransitionProps={{ onExited: toastClose }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <CustomAlert onClose={onCloseFn} severity={severity}>
        {msg}
      </CustomAlert>
    </Snackbar>
  );
};

export default Toast;
