import { FormControl, Stack, TextField } from "@mui/material";

const ConfirmDetails = () => {
  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <FormControl variant="outlined">
        <TextField
          name="confirm-account"
          label="Received 6-digit Code"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </FormControl>
    </Stack>
  );
};

export default ConfirmDetails;
