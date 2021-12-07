import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import CreatePostAvatar from './CreatePostAvatar';
import CreatePostBody from './CreatePostBody';
import CreatePostButton from './CreatePostButton';
import CreatePostOptions from './CreatePostOptions';

const CreatePost = () => {
  const { isOpen: isOpenEmoji, onOpen: openEmoji, onClose: closeEmoji } = useDisclosure();

  const { isOpen: isOpenConfirm, onOpen: openConfirm, onClose: onCloseConfirm } = useDisclosure();

  const createPost = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    openConfirm();
    console.log('submitting post');
  };

  const selectEmoji = (emoji: string) => {
    console.log('you have selected emoji = ', emoji);
    closeEmoji();
  };

  return (
    <>
      <form onSubmit={createPost}>
        <Grid
          bg="whiter"
          // border="1px solid teal"
          borderRadius="lg"
          shadow="md"
          mb={5}
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(12, 1fr)"
          px={2}
          pb={1}
          pt={4}>
          <CreatePostAvatar />

          <CreatePostBody />

          <CreatePostOptions
            openEmoji={openEmoji}
            isOpenEmoji={isOpenEmoji}
            closeEmoji={closeEmoji}
            selectEmoji={selectEmoji}
          />
          <CreatePostButton />
        </Grid>
      </form>

      <Modal isCentered blockScrollOnMount={false} isOpen={isOpenConfirm} onClose={onCloseConfirm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please confirm your post:</ModalHeader>
          <ModalBody>You are posting as John Smith </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onCloseConfirm} variant="ghost">
              Close
            </Button>
            <Button colorScheme="blue">Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
