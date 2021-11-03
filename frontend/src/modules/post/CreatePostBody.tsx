import {
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  Controller,
  UseFormClearErrors,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { PostInput } from "../../types";

type Props = {
  control: Control<PostInput, object>;
  error?: string;
  finalRef: MutableRefObject<HTMLTextAreaElement>;
  clearErrors: UseFormClearErrors<PostInput>;
};

const CreatePostBody = ({ control, error = "", finalRef }: Props) => {
  return (
    <GridItem
      px={[3, 2]}
      pr={1}
      pb={2}
      rowSpan={4}
      colSpan={[10, 9, 10]}
      mb={3}
      // bg="blue.200"
      // border="1px solid teal"
    >
      <Controller
        name="body"
        control={control}
        rules={{ required: "Post cannot be empty" }}
        render={({ field }) => (
          <FormControl h="100%">
            <Textarea
              {...field}
              id="create-post-textarea" // chakra-ui issue
              // {...register("body", { required: "Post cannot be emptyx" })}
              isInvalid={error !== ""}
              ref={finalRef}
              aria-label="post body"
              placeholder="Share your secrets anonymously"
              h={"100%"}
              resize="none"
              border="1px solid red"
            />

            {error !== "" && (
              <FormHelperText color="red.500" role="alert">
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </GridItem>
  );
};

export default CreatePostBody;
