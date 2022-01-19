import { useEffect, useReducer, useState } from "react";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import { initState, toastReducer } from "./reducer";

const useToast = () => {
  const [{ show, msg, severity }, dispatch] = useReducer(
    toastReducer,
    initState
  );

  const [durations, setDurations] = useState({
    dismiss: 4000,
    loading: 5000,
  });

  // we want to run useEffect every render since we control the exit
  useEffect(() => {
    let delay: NodeJS.Timeout;

    if (msg === TOAST_MSG_LOADING) {
      delay = setTimeout(() => {
        dispatch({ type: "long" });
      }, durations.loading);
    } else if (msg === TOAST_MSG_LONGER) {
      delay = setTimeout(() => {
        dispatch({ type: "timeout" });
      }, durations.loading);
    } else {
      delay = setTimeout(() => {
        dispatch({ type: "close" });
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
    toastClose: () => {
      dispatch({ type: "close" });
    },
    toastError: (errMsg: string) => {
      dispatch({ type: "error", payload: errMsg });
    },
    toastSetDuration: (dismiss: number, loading: number) => {
      setDurations({ dismiss, loading });
    },
    toastLoading: () => {
      dispatch({ type: "loading" });
    },
  };
};

export default useToast;
