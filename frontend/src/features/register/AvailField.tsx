import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import ErrorIcon from "@mui/icons-material/Error";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useValidated } from "./useValidated";

interface Props {
  label: string;
  type?: "text" | "password";
  toggle?: null | (() => void);
}

const ValidatedField = ({ label, type = "text", toggle = null }: Props) => {
  const sLabel = label.toLowerCase();
  const elId = `register-${label.toLowerCase()}`;

  const {
    started,
    onBlur,
    isLoading,
    isValid,
    msg,
    msgColor,
    payload,
    onChangeHandler,
  } = useValidated(sLabel as keyof RegisterState);

  return (
    <FormControl variant="outlined" error={started && !isValid && !isLoading}>
      <InputLabel htmlFor={elId}>{label}</InputLabel>
      <OutlinedInput
        sx={{ borderColor: "green" }}
        id={elId}
        name={sLabel}
        label={label}
        value={payload[sLabel as keyof RegisterPayload]}
        onChange={onChangeHandler}
        onBlur={onBlur}
        type={type}
        endAdornment={
          started ? (
            <InputAdornment position="end">
              {isLoading ? (
                <LoopIcon
                  sx={{
                    animation: "0.75s linear infinite spin",
                    "@keyframes spin": {
                      from: {
                        transform: "rotate(0deg)",
                      },
                      to: {
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                />
              ) : toggle ? (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggle}
                  edge="end"
                >
                  {type === "text" ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ) : isValid ? (
                <CheckIcon color="success" />
              ) : (
                <ErrorIcon color="error" />
              )}
            </InputAdornment>
          ) : null
        }
      />
      <FormHelperText sx={{ color: msgColor }}>{msg}</FormHelperText>
    </FormControl>
  );
};

export default ValidatedField;
