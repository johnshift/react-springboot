import { SyntheticEvent, useState } from "react";
import Head from "next/head";

import { Button, Stack } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../store";
import {
  toastClose,
  toastSuccess,
  toastInfo,
  toastError,
  toastLoading,
} from "../features/toast/toastSlice";
import Toast from "../components/Toast";

const XXX = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.value);

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(toastClose());
  };

  return (
    <div>
      <Head>
        <title>Veils App</title>
        <meta
          name="description"
          content="Share your darkest secrets - FEARLESSLY!"
        />
      </Head>
      <h1>Test Page</h1>

      <p>severity: {toast.severity}</p>
      <p>show: {toast.show.toString()}</p>
      <p>msg: {toast.msg}</p>

      <div style={{ position: "fixed", bottom: 10, left: 10 }}>
        <Stack spacing={5}>
          <Button
            color="success"
            variant="contained"
            onClick={() => dispatch(toastSuccess("success"))}
          >
            success
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={() => dispatch(toastInfo("info"))}
          >
            info
          </Button>
          <Button
            color="warning"
            variant="contained"
            onClick={() => dispatch(toastLoading())}
          >
            warning
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => dispatch(toastError("fuck you"))}
          >
            error
          </Button>
        </Stack>
      </div>

      <Toast
        show={toast.show}
        severity={toast.severity}
        msg={toast.msg}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default XXX;
