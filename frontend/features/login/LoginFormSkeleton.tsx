import { Box, Stack } from "@mui/material";
import Skeleton from "../../components/Skeleton";

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

export default LoginFormSkeleton;
