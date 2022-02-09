import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, useContext } from "react";
import RegisterContext from "./RegisterContext";
import { useValidated } from "./useValidated";
import LoopIcon from "@mui/icons-material/Loop";

const VeilDetails = () => {
  const {
    payload,
    setPayload,
    onChangeHandler,
    toggleField,
    toggleState,
    registerState,
    setRegisterState,
  } = useContext(RegisterContext);

  const { started, isValid, isLoading, onBlur, msg, msgColor } =
    useValidated("veil");

  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <FormControl variant="outlined" error={started && !isValid && !isLoading}>
        <InputLabel htmlFor="register-veil">Veil</InputLabel>
        <OutlinedInput
          sx={{ borderColor: "green" }}
          id="register-veil"
          name="veil"
          label="Veil"
          value={payload["veil"]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            setPayload({ ...payload, veil: value });

            if (value === payload.username) {
              setRegisterState({
                ...registerState,
                veil: {
                  isValid: false,
                  msg: "Veil conflicts with username",
                  msgColor: "red",
                },
              });
            }
          }}
          onBlur={payload.veil !== payload.username ? onBlur : undefined}
          type={toggleState.veil ? "text" : "password"}
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
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => toggleField("veil")}
                    edge="end"
                  >
                    {toggleState.veil ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            ) : null
          }
        />
        <FormHelperText sx={{ color: msgColor }}>{msg}</FormHelperText>
      </FormControl>

      <FormControl variant="outlined">
        <TextField
          id="register-veil-desc"
          label="Veil Description"
          name="veildesc"
          multiline
          rows={4}
          value={payload.veildesc}
          onChange={onChangeHandler}
        />
      </FormControl>
    </Stack>
  );
};

export default VeilDetails;
