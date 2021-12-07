import { FormControl, GridItem, Textarea } from '@chakra-ui/react';

const CreatePostBody = () => {
  return (
    <GridItem px={[3, 2]} pr={1} pb={2} rowSpan={4} colSpan={[10, 9, 10]} mb={3}>
      <FormControl h="100%">
        <Textarea
          id="create-post-textarea" // chakra-ui issue
          aria-label="post body"
          placeholder="Share your secrets anonymously"
          h={'100%'}
          resize="none"
          border="1px solid red"
        />
      </FormControl>
    </GridItem>
  );
};

export default CreatePostBody;
