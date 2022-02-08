import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import ErrorIcon from "@mui/icons-material/Error";

import { useValidated } from "./useValidated";

interface Props {
  label: string;
}

const ValidatedField = ({ label }: Props) => {
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
