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

import { Fragment, ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import LoginFormSkeleton from "./LoginFormSkeleton";
import {
  BACKEND_API_URL,
  MSG_SOMETHING_WENT_WRONG,
  REGEXP_EMAIL,
  REGEXP_NEAT_URI,
} from "../../constants";
import { MSG_INCORRECT_LOGIN } from "./constants";
import Toast from "../toast";
import { useAppDispatch } from "../../store";
import { newToast } from "../toast/toastSlice";

import axios, { AxiosError, AxiosResponse } from "axios";
import { sleep } from "../../utils/sleep";
import { TOAST_MSG_LOADING } from "../toast/constants";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    principal: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const login = async () => {
    const KEY_AUTHORIZATION = "authorization";

    let errmsg = MSG_SOMETHING_WENT_WRONG;

    await axios
      .post(`${BACKEND_API_URL}/login`, payload)
      .then((res: AxiosResponse) => {
        const token = res.headers[KEY_AUTHORIZATION];
        console.log("login token: ", token);
        localStorage.setItem(KEY_AUTHORIZATION, token);
        window.location.replace("/");
      })
      .catch((err: AxiosError) => {
        const response = err.response;
        if (response?.data.message) {
          errmsg = response.data.message;
        }

        setHasError(errmsg !== MSG_SOMETHING_WENT_WRONG);
        dispatch(newToast({ severity: "error", msg: errmsg }));
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasError(false);

    if (!isValid()) {
      setHasError(true);
      dispatch(newToast({ severity: "error", msg: MSG_INCORRECT_LOGIN }));
      return;
    }

    setLoading(true);
    dispatch(
      newToast({ severity: "warning", msg: TOAST_MSG_LOADING, duration: 5000 })
    );
    await Promise.all([login(), sleep(300)]).then(() => setLoading(false));
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
      <Toast ignoreClickAway={false} />
    </Fragment>
  );
};

export default LoginForm;
