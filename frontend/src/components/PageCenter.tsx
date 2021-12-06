import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const PageCenter = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minH="100vh">
      {children}
    </Box>
  );
};

export default PageCenter;
