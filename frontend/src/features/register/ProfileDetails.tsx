import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

import { useTheme } from "@mui/material/styles";
import { ChangeEvent, useContext } from "react";
import RegisterContext from "./RegisterContext";

const ProfileDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const {
    payload,
    setPayload,
    registerState,
    setRegisterState,
    started,
    setStarted,
    onChangeHandler,
  } = useContext(RegisterContext);

  const validName = (str: string): boolean => {
    return /^[a-zA-Z .'-]+$/.test(str);
  };

  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <Box>
        <FormControl
          variant="outlined"
          sx={isMobile ? { mb: 3 } : { mr: 3 }}
          error={
            !registerState.firstname.isValid &&
            registerState.firstname.msg !== ""
          }
        >
          <InputLabel htmlFor="register-firstname">Firstname</InputLabel>
          <OutlinedInput
            id="register-firstname"
            name="firstname"
            label="Firstname"
            value={payload.firstname}
            endAdornment={
              started ? (
                <InputAdornment position="end">
                  {registerState.firstname.isValid ? (
                    <CheckIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </InputAdornment>
              ) : null
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!started) {
                setStarted(true);
              }
              const value = e.currentTarget.value;
              setPayload({ ...payload, firstname: value });

              if (value.length === 0) {
                setRegisterState({
                  ...registerState,
                  firstname: {
                    isValid: false,
                    msg: "Firstname is required",
                    msgColor: "red",
                  },
                });
              } else if (value.length < 4) {
                setRegisterState({
                  ...registerState,
                  firstname: {
                    isValid: false,
                    msg: "Firstname is too short",
                    msgColor: "red",
                  },
                });
              } else if (value.length > 36) {
                setRegisterState({
                  ...registerState,
                  firstname: {
                    isValid: false,
                    msg: "Firstname is too long",
                    msgColor: "red",
                  },
                });
              } else if (!validName(value)) {
                setRegisterState({
                  ...registerState,
                  firstname: {
                    isValid: false,
                    msg: "Firstname is invalid",
                    msgColor: "red",
                  },
                });
              } else {
                setRegisterState({
                  ...registerState,
                  firstname: {
                    isValid: true,
                    msg: "Firstname is valid",
                    msgColor: "green",
                  },
                });
              }
            }}
          />
          <FormHelperText sx={{ color: registerState.firstname.msgColor }}>
            {registerState.firstname.msg}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="register-lastname">Lastname</InputLabel>
          <OutlinedInput
            id="register-lastname"
            name="lastname"
            label="Lastname"
            value={payload.lastname}
            endAdornment={
              started ? (
                <InputAdornment position="end">
                  {registerState.lastname.isValid ? (
                    <CheckIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </InputAdornment>
              ) : null
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!started) {
                setStarted(true);
              }
              const value = e.currentTarget.value;
              setPayload({ ...payload, lastname: value });

              if (value.length === 0) {
                setRegisterState({
                  ...registerState,
                  lastname: {
                    isValid: false,
                    msg: "Lastname is required",
                    msgColor: "red",
                  },
                });
              } else if (value.length < 4) {
                setRegisterState({
                  ...registerState,
                  lastname: {
                    isValid: false,
                    msg: "Lastname is too short",
                    msgColor: "red",
                  },
                });
              } else if (value.length > 36) {
                setRegisterState({
                  ...registerState,
                  lastname: {
                    isValid: false,
                    msg: "Lastname is too long",
                    msgColor: "red",
                  },
                });
              } else if (!validName(value)) {
                setRegisterState({
                  ...registerState,
                  lastname: {
                    isValid: false,
                    msg: "Lastname is invalid",
                    msgColor: "red",
                  },
                });
              } else {
                setRegisterState({
                  ...registerState,
                  lastname: {
                    isValid: true,
                    msg: "Lastname is valid",
                    msgColor: "green",
                  },
                });
              }
            }}
          />
          <FormHelperText sx={{ color: registerState.lastname.msgColor }}>
            {registerState.lastname.msg}
          </FormHelperText>
        </FormControl>
      </Box>
      <FormControl variant="outlined">
        <TextField
          id="register-profile-desc"
          label="Profile Description"
          name="desc"
          multiline
          rows={4}
          value={payload.desc}
          onChange={onChangeHandler}
        />
      </FormControl>
    </Stack>
  );
};

export default ProfileDetails;
