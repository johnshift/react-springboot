import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Availability from "./ValidatedField";
import { ChangeEvent, useContext } from "react";
import RegisterContext from "./RegisterContext";

interface Props {
  showPassword: boolean;
  togglePassword: () => void;
}

const LoginDetails = ({ showPassword, togglePassword }: Props) => {
  const { payload, setPayload, registerState, setRegisterState } =
    useContext(RegisterContext);

  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <Availability label="Username" />
      <Availability label="Email" />

      <FormControl
        fullWidth
        variant="outlined"
        error={!registerState.password.isValid && payload.password.length !== 0}
      >
        <InputLabel htmlFor="register-password">Password</InputLabel>
        <OutlinedInput
          id="register-password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={payload.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            setPayload({
              ...payload,
              password: value,
            });

            if (value.length < 6) {
              setRegisterState({
                ...registerState,
                password: {
                  isValid: false,
                  msg: "Password is too short",
                  msgColor: "red",
                },
              });
            } else if (value.length > 64) {
              setRegisterState({
                ...registerState,
                password: {
                  isValid: false,
                  msg: "Password is too long",
                  msgColor: "red",
                },
              });
            } else {
              setRegisterState({
                ...registerState,
                password: {
                  isValid: true,
                  msg: "Password is valid",
                  msgColor: "green",
                },
              });
            }
          }}
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
        <FormHelperText sx={{ color: registerState.password.msgColor }}>
          {registerState.password.msg}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default LoginDetails;
