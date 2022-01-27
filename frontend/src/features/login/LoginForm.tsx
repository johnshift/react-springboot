import {
  Paper,
  Typography,
  Stack,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Button,
} from "@mui/material";
import Skeleton from "../../components/skeleton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Link from "next/link";
import { useLoginForm } from "./useLoginForm";

const LoginFormSkeleton = () => {
  return (
    <Stack spacing={3} data-testid="loginForm-skl">
      <Skeleton height={56} width={265} />
      <Skeleton height={56} width={265} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Skeleton height={25} width={140} borderRadius="5px" />
        <Skeleton height={36.5} width={76} />
      </Box>
    </Stack>
  );
};

const LoginForm = () => {
  const {
    loading,
    hasError,
    payload,
    onChangeHandler,
    showPassword,
    togglePassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
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
              <FormControl variant="outlined" fullWidth error={hasError}>
                <InputLabel htmlFor="login-principal">
                  Username or Email
                </InputLabel>
                <OutlinedInput
                  id="login-principal"
                  name="principal"
                  value={payload.principal}
                  onChange={onChangeHandler}
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
                  onChange={onChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
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
    </>
  );
};

export default LoginForm;
