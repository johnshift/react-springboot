import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

const ProfileDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Stack spacing={3} sx={{ my: 2 }}>
      <Box>
        <FormControl variant="outlined" sx={isMobile ? { mb: 3 } : { mr: 3 }}>
          <InputLabel htmlFor="register-firstname">Firstname</InputLabel>
          <OutlinedInput
            id="register-firstname"
            name="firstname"
            label="Firstname"
          ></OutlinedInput>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="register-lastname">Lastname</InputLabel>
          <OutlinedInput
            id="register-lastname"
            name="lastname"
            label="Lastname"
          ></OutlinedInput>
        </FormControl>
      </Box>
      <FormControl variant="outlined">
        <TextField
          id="register-profile-desc"
          label="Profile Description"
          multiline
          rows={4}
        />
      </FormControl>
    </Stack>
  );
};

export default ProfileDetails;
