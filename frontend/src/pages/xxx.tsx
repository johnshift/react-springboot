import Head from "next/head";

import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { newToast, setDelayParams } from "../features/toast/toastSlice";
import Toast from "../features/toast";

import { useAppDispatch, useAppSelector } from "../store";
import {
  TOAST_MSG_LOADING,
  TOAST_MSG_LONGER,
} from "../features/toast/constants";
import { FormEvent, useEffect, useState } from "react";
import { sleep } from "../utils/sleep";
import { LOGIN_MSG_OK, LOGIN_MSG_INCORRECT } from "../features/login/constants";
import { MSG_SOMETHING_WENT_WRONG } from "../constants";

const XXX = () => {
  const dispatch = useAppDispatch();

  const [principal, setPrincipal] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { msg: toastMsg } = useAppSelector((state) => state.toast.value);

  useEffect(() => {
    // auto set loading to false if smth-went-wrong
    console.log(`use effect -> loading=${loading.toString()}, msg=${toastMsg}`);
    if (loading && toastMsg === MSG_SOMETHING_WENT_WRONG) {
      console.log("useEffect setloading to false");
      setLoading(false);
    }
  }, [loading, toastMsg]);

  const [dummy, setDummy] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries());
    console.log("data = ", data);

    const exec = async () => {
      console.log(
        `submit called --- principal="${principal}" --- dummy="${dummy}"`
      );

      dispatch(
        setDelayParams({
          loadingDelay: 300,
          longDelay: 500,
          smthErrDelay: 900,
        })
      );

      setLoading(true);
      dispatch(
        newToast({
          severity: "warning",
          msg: TOAST_MSG_LOADING,
          duration: 5000,
        })
      );

      await sleep(1000);

      const validate = async (_xxx: string) => {
        console.log(
          "validate called",
          "principal =",
          `"${principal}"`,
          `_xxx = "${_xxx}"`
        );
        if (principal === "seggs") {
          console.log("principal === seggs");
          setHasError(false);
          dispatch(newToast({ severity: "success", msg: LOGIN_MSG_OK }));
        } else if (principal === "smth") {
          console.log("principal === smth");
          setHasError(true);
          dispatch(
            newToast({ severity: "error", msg: MSG_SOMETHING_WENT_WRONG })
          );
        } else if (principal === "long") {
          console.log("principal === long");
          console.log("sleeping for 5sec");

          await sleep(1000);
          console.log("done sleeping");
        } else {
          setHasError(true);
          dispatch(newToast({ severity: "error", msg: LOGIN_MSG_INCORRECT }));
        }

        setDummy(`"${principal}"`);
      };

      await validate(principal);
      console.log("setting loading to false");
      setLoading(false);
    };
    exec();
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
      <p>dummy = {dummy}</p>

      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <h1 data-testid="loginForm-skl">Loading ...</h1>
          ) : (
            <>
              <FormControl fullWidth variant="outlined" error={hasError}>
                <InputLabel htmlFor="login-principal">
                  Username or Email
                </InputLabel>
                <OutlinedInput
                  id="login-principal"
                  name="principal"
                  value={principal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPrincipal(e.currentTarget.value);
                    console.log("e.target.value = ", e.currentTarget.value);
                  }}
                  label="Username or Email"
                />
              </FormControl>

              {/* <label htmlFor="login-principal">Username or Email</label>
              <input
                id="login-principal"
                name="principal"
                placeholder="Username or Email"
                value={principal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrincipal(e.currentTarget.value);
                  setDummy(e.currentTarget.value);
                  console.log("e.target.value = ", e.currentTarget.value);
                }}
              /> */}

              <Button variant="contained" type="submit">
                Login
              </Button>
            </>
          )}
        </form>
      </div>

      <div style={{ position: "fixed", bottom: 10, left: 10 }}>
        <Stack spacing={5}>
          <Button
            color="warning"
            variant="contained"
            onClick={() =>
              dispatch(
                newToast({
                  severity: "warning",
                  msg: TOAST_MSG_LOADING,
                  duration: 5000,
                })
              )
            }
          >
            warning
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default XXX;
