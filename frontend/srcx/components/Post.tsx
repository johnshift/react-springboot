import {
  Box,
  Flex,
  Center,
  Avatar,
  Text,
  Spacer,
  Icon,
  IconButton,
  Button,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import Link from "next/link";

import EmojiSelector from "./EmojiSelector";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaLaughSquint } from "react-icons/fa";

import useStore, { reactionType, PostProps } from "../store";

const prettyReactions = (reactions: reactionType[]): string => {
  if (reactions.length == 0) {
    return "Be the first to react";
  }

  if (reactions.length == 1) {
    return reactions[0].owner;
  }

  let others = " other";
  if (reactions.length > 2) {
    others += "s";
  }

  return reactions[0].owner + " and " + (reactions.length - 1) + others;
};

const Post = (post: PostProps) => {
  const { auth_name, updatePostVote, addReaction } = useStore();

  const {
    isOpen: isOpenEmoji,
    onOpen: onOpenEmoji,
    onClose: onCloseEmoji,
  } = useDisclosure();

  const onSelectEmoji = (emoji: string) => {
    console.log("emoji: ", emoji);
    onCloseEmoji();
    addReaction(post.id, auth_name, emoji);
  };

  let own_reaction = "";
  for (const r of post.reactions) {
    if (r.owner == auth_name) {
      own_reaction = r.reaction;
      break;
    }
  }

  return (
    <Box
      bg="whiter"
      borderRadius="lg"
      shadow="md"
      px={1}
      pt={2}
      pr={3}
      mb={5}
      // border="1px solid teal"
    >
      {/* HEADER */}
      <Flex h="80px" gap={0}>
        <Box w="20%">
          <Center h="100%">
            <Link href="/user_1">
              <a>
                <Avatar size="lg" />
              </a>
            </Link>
          </Center>
        </Box>
        <Box h="100%" w="80%" p={2} pt={3}>
          <Text fontSize="lg">{post.owner}</Text>
          <Text fontSize="sm">{post.created}</Text>
        </Box>
      </Flex>

      {/* BODY */}
      <Flex
        w="100%"
        px={5}
        // minH="40px"
        justify="start"
        flexDirection="column"
        // border="1px solid gray"
      >
        {post.body.split("\n").map((t, i) => (
          <Box key={i} py={1}>
            {t}
          </Box>
        ))}
      </Flex>

      {/* FOOTER */}
      <Flex h="100px" flexDirection="column" p={2} pb={0}>
        {/* UPPER FOOTER */}
        <Flex h="40%" w="100%" borderBottom="1px solid #dbdbdb">
          <Flex
            w={["40%", "35%"]}
            align="center"
            justify="start"
            // border="1px solid red"
          >
            <ButtonGroup size="xs" isAttached variant="ghost">
              <Button
                leftIcon={
                  <Icon
                    as={MdOutlineLocalFireDepartment}
                    w={5}
                    h={5}
                    color="red.600"
                  />
                }
              >
                {post.vote_count}
              </Button>
              <IconButton
                aria-label="Upvote"
                icon={<Icon as={IoIosArrowUp} />}
                onClick={() => {
                  updatePostVote(post.id, 1);
                }}
              />
              <IconButton
                aria-label="Downvote"
                icon={<Icon as={IoIosArrowDown} />}
                onClick={() => {
                  updatePostVote(post.id, -1);
                }}
              />
            </ButtonGroup>
          </Flex>
          {/* <Spacer /> */}
          <Flex
            w="70%"
            align="center"
            justify="end"
            // border="1px solid blue"
          >
            {post.reactions.map((reaction, i) => (
              <Text fontSize="sm" mr={1} key={i}>
                {reaction.reaction}
              </Text>
            ))}
            <Text fontSize="xs">{prettyReactions(post.reactions)}</Text>
          </Flex>
        </Flex>

        {/* LOWER FOOTER */}
        <Flex h="60%" w="100%">
          <Flex w="25%" align="center" justify="start">
            <Button size="xs" variant="ghost" h="80%">
              {post.comment_count} comments
            </Button>
          </Flex>
          <Spacer />
          <Flex w="30%" align="center" justify="end">
            <Button
              size="xs"
              variant="ghost"
              h="80%"
              leftIcon={
                own_reaction === "" ? (
                  <Icon as={FaLaughSquint} w={5} h={5} />
                ) : undefined
              }
              onClick={onOpenEmoji}
            >
              <Text fontSize="xl" mr={1}>
                {own_reaction}
              </Text>{" "}
              react
            </Button>
          </Flex>

          <Modal
            isOpen={isOpenEmoji}
            onClose={onCloseEmoji}
            isCentered
            scrollBehavior="inside"
            blockScrollOnMount={false}
          >
            <ModalOverlay />
            <ModalContent w="300px" maxH="300px">
              <ModalHeader textAlign="center">Select Emoji</ModalHeader>
              <ModalBody>
                <EmojiSelector onSelectEmoji={onSelectEmoji} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Post;
