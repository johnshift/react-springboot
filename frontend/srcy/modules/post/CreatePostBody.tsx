import {
  GridItem,
  Textarea,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { Controller, UseFormClearErrors, Control } from "react-hook-form";
import { PostInput } from "../../types";

type Props = {
  control: Control<PostInput, object>;
  error?: string;
  finalRef: MutableRefObject<HTMLTextAreaElement>;
  clearErrors: UseFormClearErrors<PostInput>;
  cursorPos: number;
  setCursorPos: Dispatch<SetStateAction<number>>;
};

const CreatePostBody = ({
  cursorPos,
  control,
  error = "",
  finalRef,
  setCursorPos,
}: Props) => {
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
        render={({
          field: { onChange: oC, onBlur: oB, ref: _ref, ...rest },
        }) => (
          <FormControl h="100%">
            <Textarea
              {...rest}
              id="create-post-textarea" // chakra-ui issue
              isInvalid={error !== ""}
              ref={finalRef}
              aria-label="post body"
              placeholder="Share your secrets anonymously"
              h={"100%"}
              resize="none"
              border="1px solid red"
              onClick={(e: unknown) => {
                setCursorPos(
                  (e as ChangeEvent<HTMLTextAreaElement>).target.selectionStart
                );
              }}
              onChange={(e) => {
                oC(e);
                setCursorPos(e.target.selectionStart);
              }}
              onBlur={(e) => {
                oB();
                setCursorPos(e.target.selectionStart);
              }}
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
