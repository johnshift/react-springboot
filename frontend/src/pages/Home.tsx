import { Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import PageCenter from '../common/components/PageCenter';
import { JWT_HEADER_KEY } from '../common/constants';
import CreatePost from '../features/post/CreatePost';

const Home = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!localStorage.getItem(JWT_HEADER_KEY)) {
      setLocation('/login');
    }
  }, []);

  return (
    <>
      <PageCenter>
        <Box>
          <CreatePost />
        </Box>
      </PageCenter>
    </>
  );
};

export default Home;
