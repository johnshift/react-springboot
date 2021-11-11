import { MutableRefObject, useRef, useState } from "react";
import {
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import CreatePostAvatar from "./CreatePostAvatar";
import CreatePostBody from "./CreatePostBody";
import CreatePostOptions from "./CreatePostOptions";
import CreatePostButton from "./CreatePostButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostInput } from "../../types/post";

const CreatePost = () => {
  // const [postBody, setPostBody] = useState("");

  const {
    isOpen: isOpenEmoji,
    onOpen: openEmoji,
    onClose: closeEmoji,
  } = useDisclosure();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<PostInput>({ shouldFocusError: false });

  const finalRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  // const finalRef = useRef() as RefObject<HTMLTextAreaElement>;

  // useEffect(() => {
  //   // fix: textarea focus cursor to the end after emoji eselection
  //   finalRef.current.selectionStart = finalRef.current.value.length;
  //   finalRef.current.selectionEnd = finalRef.current.value.length;
  // }, [setFocus]);

  const [cursorPos, setCursorPos] = useState(0);
  const selectEmoji = (emoji: string) => {
    const body = getValues("body") || "";

    const before = body.substring(0, cursorPos);
    const after = body.substring(cursorPos, body.length);

    setValue("body", before + " " + emoji + " " + after);
    closeEmoji();
  };

  const {
    isOpen: isOpenConfirm,
    onOpen: openConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const onSubmit: SubmitHandler<PostInput> = (data) => {
    // post as default value:
    if (data.asVeil === undefined) {
      data.asVeil = false;
    }

    openConfirm();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          pt={4}
        >
          <CreatePostAvatar />

          <CreatePostBody
            control={control}
            clearErrors={clearErrors}
            error={errors.body ? errors.body.message : ""}
            finalRef={finalRef}
            cursorPos={cursorPos}
            setCursorPos={setCursorPos}
          />

          <CreatePostOptions
            openEmoji={openEmoji}
            isOpenEmoji={isOpenEmoji}
            closeEmoji={closeEmoji}
            finalRef={finalRef}
            selectEmoji={selectEmoji}
          />
          <CreatePostButton
            // postBody={postBody}
            // setPostBody={setPostBody}
            getValues={getValues}
            setValue={setValue}
          />
        </Grid>
      </form>

      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      >
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
