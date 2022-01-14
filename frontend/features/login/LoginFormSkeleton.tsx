import { Skeleton, Box, Stack } from "@mui/material";

const LoginFormSkeleton = () => {
  return (
    <Stack spacing={3} data-testid="loginForm-skl">
      <Skeleton
        variant="rectangular"
        sx={{
          height: 56,
          width: 265,
          borderRadius: "10px",
        }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        sx={{
          height: 56,
          width: 265,
          borderRadius: "10px",
        }}
        animation="wave"
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Skeleton
          variant="rectangular"
          sx={{ width: 140, height: 25, borderRadius: "5px" }}
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          sx={{
            height: 36.5,
            width: 76,
            borderRadius: "10px",
          }}
          animation="wave"
        />
      </Box>
    </Stack>
  );
};

export default LoginFormSkeleton;
