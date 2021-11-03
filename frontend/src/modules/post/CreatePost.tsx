import { MutableRefObject, useRef } from "react";
import { Grid, useDisclosure } from "@chakra-ui/react";

import CreatePostAvatar from "./CreatePostAvatar";
import CreatePostBody from "./CreatePostBody";
import CreatePostOptions from "./CreatePostOptions";
import CreatePostButton from "./CreatePostButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostInput } from "../../types/post";

const CreatePost = () => {
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

  const onSubmit: SubmitHandler<PostInput> = (data) => {
    console.log("data: ", data);
  };

  const finalRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const selectEmoji = (emoji: string) => {
    const body = getValues("body") || "";
    setValue("body", body + emoji + " ");
    closeEmoji();
  };

  return (
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
        />

        <CreatePostOptions
          openEmoji={openEmoji}
          isOpenEmoji={isOpenEmoji}
          closeEmoji={closeEmoji}
          finalRef={finalRef}
          selectEmoji={selectEmoji}
        />
        <CreatePostButton getValues={getValues} setValue={setValue} />
      </Grid>
    </form>
  );
};
export default CreatePost;
