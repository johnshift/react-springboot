import {
  Grid,
  GridItem,
  Avatar,
  Center,
  Textarea,
  Icon,
  IconButton,
  Flex,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdPerson } from "react-icons/md";
import { GiDoubleFaceMask } from "react-icons/gi";
import { IoMdHeart, IoIosAt, IoIosCalendar } from "react-icons/io";

const CreatePostImage = () => (
  <GridItem
    ml={1}
    rowSpan={6}
    colSpan={[2, 3, 2]}
    // bg="teal.200"
  >
    <Center>
      <Avatar size="lg" />
    </Center>
  </GridItem>
);

const CreatePostInput = () => (
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
      placeholder="Share your secrets anonymously"
      h={"100%"}
      resize="none"
      border="1px solid red"
      colorScheme="blue"
      // variant="filled"
    />
  </GridItem>
);

const CreatePostOptions = () => (
  <GridItem
    rowSpan={2}
    colSpan={[5, 5, 6]}
    // bg="cyan.200"
    // border="1px solid teal"
    ml={[-1, 1]}
  >
    {/* <Center h="100%"> */}
    <Flex align="center" justify="start" h="100%">
      <IconButton
        color="blackt"
        variant="outline"
        border="none"
        aria-label="select emoji"
        icon={<Icon as={IoMdHeart} w={6} h={6} />}
        isRound
      />
      <IconButton
        color="blackt"
        variant="outline"
        border="none"
        aria-label="mention someone"
        icon={<Icon as={IoIosAt} w={6} h={6} />}
        isRound
      />
      <IconButton
        color="blackt"
        variant="outline"
        border="none"
        aria-label="dark mode"
        icon={<Icon as={IoIosCalendar} w={6} h={6} />}
        isRound
      />
    </Flex>
    {/* </Center> */}
  </GridItem>
);

const CreatePostButton = () => {
  const toast = useToast();
  const [asVeil, setAsVeil] = useState(true);

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
          <Button>Post</Button>
          <IconButton
            aria-label="Post As"
            icon={
              <Icon as={asVeil ? MdPerson : GiDoubleFaceMask} w={6} h={6} />
            }
            onClick={() => {
              setAsVeil(!asVeil);
              toast.closeAll();
              toast({
                title: asVeil ? "Post using Veil Profile" : "Post as John Doe",
                description: asVeil
                  ? "Other users will not identify you"
                  : "Your profile will be seen in public",
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

const CreatePost = () => (
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
    <CreatePostInput />
    <CreatePostOptions />
    <CreatePostButton />
  </Grid>
);

export default CreatePost;
