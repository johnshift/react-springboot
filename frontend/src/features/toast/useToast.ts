import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import {
  toastClose,
  toastError,
  toastLoading,
  toastLonger,
  toastInfo,
  toastSuccess,
  toastTimeout,
} from "./toastSlice";
import { ToastMsgError, ToastMsgSuccess } from "./types";

const useToast = () => {
  const { show, msg, severity } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const [durations, setDurations] = useState({
    dismiss: 4000,
    loading: 5000,
  });

  // we want to run useEffect every render since we control the exit
  useEffect(() => {
    let delay: NodeJS.Timeout;

    if (msg === TOAST_MSG_LOADING) {
      delay = setTimeout(() => {
        dispatch(toastLonger());
      }, durations.loading);
    } else if (msg === TOAST_MSG_LONGER) {
      delay = setTimeout(() => {
        dispatch(toastTimeout());
      }, durations.loading);
    } else {
      delay = setTimeout(() => {
        dispatch(toastClose());
      }, durations.dismiss);
    }

    return () => {
      clearTimeout(delay);
    };
  });

  return {
    show,
    msg,
    severity,
    toastClose: () => dispatch(toastClose()),
    toastInfo: (infoMsg: string) => dispatch(toastInfo({ msg: infoMsg })),
    toastSuccess: (successMsg: ToastMsgSuccess) =>
      dispatch(toastSuccess({ msg: successMsg })),
    toastError: (errMsg: ToastMsgError) =>
      dispatch(toastError({ msg: errMsg })),
    toastLoading: () => dispatch(toastLoading()),
    toastLonger: () => dispatch(toastLonger()),
    toastTimeout: () => dispatch(toastTimeout()),
    toastSetDurations: (dismiss: number, loading: number) => {
      setDurations({ dismiss, loading });
    },
  };
};

export default useToast;
