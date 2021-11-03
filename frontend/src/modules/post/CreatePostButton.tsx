import {
  GridItem,
  Flex,
  ButtonGroup,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";

const CreatePostButton = () => {
  return (
    <GridItem
      rowSpan={2}
      colSpan={[5, 4, 4]}
      // bg="pink.100"
      // border="1px solid teal"
      mr={[1, 2]}
    >
      <Flex align="center" justify="end" h="100%">
        <ButtonGroup size="md" isAttached variant="outline" color="blackt">
          <Button
            onClick={() => {
              addPost({
                id: 999, // this is manually generated (change in backend)
                comment_count: 0,
                vote_count: 0,
                body: postBody,
                owner: auth_name,
                created: prettyDate(new Date().toISOString()),
                reactions: [],
              });

              // clear postbody
              setPostBody("");
            }}
          >
            Post
          </Button>
          <IconButton
            aria-label="Post As"
            icon={
              <Icon as={asVeil ? MdPerson : GiDoubleFaceMask} w={6} h={6} />
            }
            onClick={() => {
              setAsVeil(!asVeil);
              toast.closeAll();
              toast({
                title: asVeil ? "Posting as your Veil" : "Post as John Doe",
                description: asVeil
                  ? "Only your veil profile will be visible in your post"
                  : "Your public profile will be visible in your post",
                position: "top",
                status: "info",
              });
            }}
          />
        </ButtonGroup>
      </Flex>
    </GridItem>
  );
};

export default CreatePostButton;
