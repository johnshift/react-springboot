import { GridItem, Textarea } from "@chakra-ui/react";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type Props = {
  finalRef: MutableRefObject<HTMLTextAreaElement>;
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
};

const CreatePostBody = ({ finalRef, postBody, setPostBody }: Props) => {
  return (
    <GridItem
      px={[3, 2]}
      pr={1}
      pb={2}
      rowSpan={4}
      colSpan={[10, 9, 10]}
      // bg="blue.200"
      // border="1px solid teal"
    >
      <Textarea
        ref={finalRef}
        placeholder="Share your secrets anonymously"
        h={"100%"}
        resize="none"
        border="1px solid red"
        colorScheme="blue"
        value={postBody}
        onChange={(e) => {
          setPostBody(e.target.value);
        }}
        autoFocus
        onFocus={(e) => {
          e.preventDefault();
        }}
      />
    </GridItem>
  );
};

export default CreatePostBody;
