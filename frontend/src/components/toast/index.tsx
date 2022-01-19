import { SyntheticEvent } from "react";

import CustomAlert from "./CustomAlert";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";

interface Props {
  show: boolean;
  msg: string;
  severity: AlertColor;
  onExited: () => void;
  ignoreClickAway?: boolean;
}

const Toast = ({
  show,
  msg,
  severity,
  onExited,
  ignoreClickAway = true,
}: Props) => {
  const onClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway" && ignoreClickAway) {
      return;
    }

    onExited();
  };

  const isLoading = msg === TOAST_MSG_LOADING || msg === TOAST_MSG_LONGER;
  const onCloseFn = isLoading ? undefined : onClose;

  return (
    <Snackbar
      key={msg}
      open={show}
      onClose={onCloseFn}
      TransitionProps={{ onExited }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <CustomAlert onClose={onCloseFn} severity={severity}>
        {msg}
      </CustomAlert>
    </Snackbar>
  );
};

export default Toast;
