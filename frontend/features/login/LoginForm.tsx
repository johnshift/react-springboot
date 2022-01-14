import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  Skeleton,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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
    showSnackbar: false,
    msgSnackbar: "Incorrect username/email",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setState({
        ...state,
        showSnackbar: true,
      });
      setLoading(false);
    }, 3000);
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, showSnackbar: false });
  };

  const severity = "error";

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
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="login-principal">
                  Username/Email
                </InputLabel>
                <OutlinedInput
                  id="login-principal"
                  name="principal"
                  type={state.showPassword ? "text" : "password"}
                  value={state.principal}
                  onChange={handleChange}
                  label="Username/Email"
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ marginBottom: 3 }}
                variant="outlined"
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
                  <MuiLink underline="hover">Create an account</MuiLink>
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
        open={state.showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {state.msgSnackbar}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LoginForm;
