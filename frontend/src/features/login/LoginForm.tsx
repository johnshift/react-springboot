import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Box,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Fragment, ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import LoginFormSkeleton from "./LoginFormSkeleton";
import {
  MSG_SOMETHING_WENT_WRONG,
  REGEXP_EMAIL,
  REGEXP_NEAT_URI,
} from "../../constants";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { newToast } from "../toast/toastSlice";

import axios, { AxiosError, AxiosResponse } from "axios";
import { sleep } from "../../utils/sleep";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "../toast/constants";
import apiLogin from "./apiLogin";

const LoginForm = () => {
  const { params: toastParams, msg: toastMsg } = useAppSelector(
    (state) => state.toast.value
  );

  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    principal: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // auto set loading to false if type is not loading or longer
    if (
      loading &&
      toastMsg !== TOAST_MSG_LONGER &&
      toastMsg !== TOAST_MSG_LOADING
    ) {
      setLoading(false);
    }
  }, [loading, toastMsg, toastParams.stmhErrDelay]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPayload({
      ...payload,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const isValid = () => {
    const { principal, password } = payload;

    const MIN_PRINCIPAL_LENGTH = 4;
    const MIN_PASSWORD_LENGTH = 6;
    const MAX_LOGIN_INPUT_LENGTH = 64;

    if (!principal) {
      return false;
    }

    if (!password) {
      return false;
    }

    if (
      principal.length < MIN_PRINCIPAL_LENGTH ||
      principal.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return false;
    }

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return false;
    }

    if (!REGEXP_NEAT_URI.test(principal) && !REGEXP_EMAIL.test(principal)) {
      return false;
    }

    return true;
  };

  // we need to wrap login into a promise to get rid of flicker loading
  const login = async (): Promise<Function> => {
    console.log("fuck you");
    const KEY_AUTHORIZATION = "authorization";

    let success = false;
    let errmsg = MSG_SOMETHING_WENT_WRONG;

    const thenFn = (res: AxiosResponse) => {
      // set token into localStorage
      const token = res.headers[KEY_AUTHORIZATION];
      localStorage.setItem(KEY_AUTHORIZATION, token);

      success = true;
    };

    const catchFn = (err: Error | AxiosError) => {
      if (axios.isAxiosError(err) && err.response) {
        errmsg = err.response.data.message;
      }
    };

    await apiLogin({ thenFn, catchFn, payload });

    return Promise.resolve(() => {
      setLoading(false);
      if (!success) {
        setHasError(errmsg !== MSG_SOMETHING_WENT_WRONG);
        dispatch(newToast({ severity: "error", msg: errmsg }));
      } else {
        dispatch(newToast({ severity: "success", msg: LOGIN_MSG_OK }));
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasError(false);

    if (!isValid()) {
      setHasError(true);
      dispatch(newToast({ severity: "error", msg: LOGIN_MSG_INCORRECT }));
      return;
    }

    setLoading(true);
    dispatch(
      newToast({ severity: "warning", msg: TOAST_MSG_LOADING, duration: 5000 })
    );

    await Promise.all([login(), sleep(300)]).then(([fn]) => fn());
  };

  return (
    <Fragment>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingY: 3,
          paddingX: 5,
          width: "max(300px, 345px)",
          textAlign: "center",
        }}
      >
        <Typography
          color="primary"
          variant="h2"
          mb={3}
          component="div"
          fontWeight={500}
          gutterBottom
        >
          veils
        </Typography>
        {loading ? (
          <LoginFormSkeleton />
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth variant="outlined" error={hasError}>
                <InputLabel htmlFor="login-principal">
                  Username or Email
                </InputLabel>
                <OutlinedInput
                  id="login-principal"
                  name="principal"
                  value={payload.principal}
                  onChange={handleChange}
                  label="Username or Email"
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ marginBottom: 3 }}
                variant="outlined"
                error={hasError}
              >
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={payload.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pl={0.5}
              >
                <Link href="/signup" passHref>
                  <MuiLink underline="hover" color="inherit">
                    Create an account
                  </MuiLink>
                </Link>

                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      </Paper>
    </Fragment>
  );
};

export default LoginForm;
