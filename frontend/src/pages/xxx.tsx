import Head from "next/head";

import { Button, Stack } from "@mui/material";
import { newToast } from "../features/toast/toastSlice";
import Toast from "../components/Toast";

import { useAppDispatch } from "../store";
import { TOAST_MSG_LOADING } from "../features/toast/constants";

const XXX = () => {
  const dispatch = useAppDispatch();

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

      <div style={{ position: "fixed", bottom: 10, left: 10 }}>
        <Stack spacing={5}>
          <Button
            color="success"
            variant="contained"
            onClick={() =>
              dispatch(newToast({ severity: "success", msg: "SUCCESS" }))
            }
          >
            success
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={() =>
              dispatch(newToast({ severity: "info", msg: "INFO" }))
            }
          >
            info
          </Button>
          <Button
            color="warning"
            variant="contained"
            onClick={() =>
              dispatch(
                newToast({ severity: "warning", msg: TOAST_MSG_LOADING })
              )
            }
          >
            warning
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() =>
              dispatch(newToast({ severity: "error", msg: "FUCK YOU" }))
            }
          >
            error
          </Button>
        </Stack>
      </div>

      <Toast />
    </div>
  );
};

export default XXX;
