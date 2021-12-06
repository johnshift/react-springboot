import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import PageCenter from '../components/PageCenter';
import { JWT_HEADER_KEY } from '../constants';

const Home = () => {
  const [, setLocation] = useLocation();

  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem(JWT_HEADER_KEY)) {
      setLocation('/login');
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    localStorage.removeItem(JWT_HEADER_KEY);
    toast({
      title: 'You have successfully logged out',
      status: 'success',
      duration: 3000
    });
    setLocation('/login');
  };

  return (
    <>
      <PageCenter>
        <Box>
          <Heading>Home Page</Heading>
        </Box>
      </PageCenter>
      <Box position="fixed" top="5" right="10">
        <Button onClick={onOpen} variant="solid" colorScheme="red">
          Logout
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h2" size="lg">
              Are you sure you want to logout?
            </Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={logout}>
              Logout
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
