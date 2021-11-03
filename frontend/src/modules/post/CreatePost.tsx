import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Grid, useDisclosure } from "@chakra-ui/react";

import CreatePostImage from "./CreatePostImage";
import CreatePostBody from "./CreatePostBody";
import CreatePostOptions from "./CreatePostOptions";

const CreatePost = () => {
  const [postBody, setPostBody] = useState("");

  const finalRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    // fix: textarea focus cursor to the end after emoji eselection
    finalRef.current.selectionStart = finalRef.current.value.length;
    finalRef.current.selectionEnd = finalRef.current.value.length;
  }, [postBody]);

  const {
    isOpen: isOpenEmoji,
    onOpen: openEmoji,
    onClose: closeEmoji,
  } = useDisclosure();

  const selectEmoji = (emoji: string) => {
    setPostBody(postBody + " " + emoji + " ");
    closeEmoji();
  };

  return (
    <Grid
      bg="whiter"
      // border="1px solid teal"
      borderRadius="lg"
      shadow="md"
      mb={5}
      h={200}
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(12, 1fr)"
      px={2}
      pb={3}
      pt={4}
    >
      <CreatePostImage />
      <CreatePostBody
        finalRef={finalRef}
        postBody={postBody}
        setPostBody={setPostBody}
      />
      <CreatePostOptions
        openEmoji={openEmoji}
        isOpenEmoji={isOpenEmoji}
        closeEmoji={closeEmoji}
        finalRef={finalRef}
        selectEmoji={selectEmoji}
      />
    </Grid>
  );
};
export default CreatePost;
