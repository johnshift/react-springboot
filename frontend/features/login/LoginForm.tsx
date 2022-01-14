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
  Snackbar,
  Stack,
  Button,
  Alert as MuiAlert,
} from "@mui/material";
import { AlertProps, AlertColor } from "@mui/material/Alert";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Fragment,
  ChangeEvent,
  FormEvent,
  useState,
  forwardRef,
  SyntheticEvent,
} from "react";
import Link from "next/link";
import LoginFormSkeleton from "./LoginFormSkeleton";
import { REGEXP_EMAIL, REGEXP_NEAT_URI } from "../../constants";
import { MSG_INCORRECT_LOGIN } from "./constants";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      sx={
        props.severity === "error"
          ? {
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
            }
          : {}
      }
      {...props}
    />
  );
});

const LoginForm = () => {
  const [state, setState] = useState({
    principal: "",
    password: "",
    showPassword: false,
    toastShow: false,
    toastMsg: "Incorrect username/email",
    toastSeverity: "error" as AlertColor,
    hasError: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, toastShow: false });
  };

  const isValid = () => {
    const { principal, password } = state;

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

  const toast = (toastMsg: string, toastSeverity: AlertColor) => {
    setState({
      ...state,
      toastMsg,
      toastSeverity,
      toastShow: true,
      hasError: toastSeverity === "error",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid()) {
      toast(MSG_INCORRECT_LOGIN, "error");
    }
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
              <FormControl fullWidth variant="outlined" error={state.hasError}>
                <InputLabel htmlFor="login-principal">
                  Username or Email
                </InputLabel>
                <OutlinedInput
                  id="login-principal"
                  name="principal"
                  value={state.principal}
                  onChange={handleChange}
                  label="Username or Email"
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ marginBottom: 3 }}
                variant="outlined"
                error={state.hasError}
              >
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
                  name="password"
                  type={state.showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setState({
                            ...state,
                            showPassword: !state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
      <Snackbar
        open={state.toastShow}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={state.toastSeverity}>
          {state.toastMsg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LoginForm;
