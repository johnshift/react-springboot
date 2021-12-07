import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useLocation } from 'wouter';
import { JWT_HEADER_KEY } from '../constants';

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const [location, setLocation] = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // todo: change this from router -> state management of loggedin status
    // check login status on each router change
    localStorage.getItem(JWT_HEADER_KEY) != null ? setShowNav(true) : setShowNav(false);
  }, [location]);

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
      {showNav && (
        <>
          <Flex
            bg="white"
            position="fixed"
            top={0}
            w="100%"
            shadow="md"
            p={3}
            align="center"
            justify="center"
            px={['5px', '8%', '18%', '23%', '29%']}
            zIndex="sticky">
            <Box>
              <Heading size="2xl">veils</Heading>
            </Box>
            <Spacer />
            <Box>
              <Menu isLazy id="chakra-#4328-1">
                <MenuButton
                  as={IconButton}
                  aria-label="menu"
                  icon={<Icon as={MdMenu} w={10} h={10} />}
                  variant="ghost"
                />
                <MenuList id="chakra-#4328-13">
                  <MenuItem id="chakra-#4328-14" onClick={onOpen}>
                    Logout
                  </MenuItem>
                  <MenuItem>Shit</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
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
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    logout();
                    onClose();
                  }}>
                  Logout
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Nav;
