import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";

interface Props {
  showVeil: boolean;
  toggleVeil: () => void;
}

const VeilDetails = ({ showVeil, toggleVeil }: Props) => {
  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="register-veil-name">Veil Name</InputLabel>
        <OutlinedInput
          id="register-veil-name"
          name="veil-name"
          type={showVeil ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleVeil}
                edge="end"
              >
                {showVeil ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Veil Name"
        />
      </FormControl>

      <FormControl variant="outlined">
        <TextField
          id="register-veil-desc"
          label="Veil Description"
          multiline
          rows={4}
        />
      </FormControl>
    </Stack>
  );
};

export default VeilDetails;
