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
} from "@chakra-ui/react";
import Link from "next/link";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaLaughSquint } from "react-icons/fa";

import { reactionType, PostProps } from "../store";

const prettyReactions = (reactions: reactionType[]): string => {
  if (reactions.length == 1) {
    return reactions[0].owner;
  }

  return reactions[0].owner + " and " + (reactions.length - 1) + " others";
};

const Post = ({
  comment_count,
  vote_count,
  body,
  owner,
  created,
  reactions,
}: PostProps) => (
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
        <Text fontSize="lg">{owner}</Text>
        <Text fontSize="sm">{created} ago</Text>
      </Box>
    </Flex>

    {/* BODY */}
    <Flex
      w="100%"
      px={5}
      minH="80px"
      align="center"
      justify="start"
      flexDirection="column"
      // border="1px solid gray"
    >
      {body.split("\n").map((t, i) => (
        <Box key={i} py={1}>
          {t}
        </Box>
      ))}
    </Flex>

    {/* FOOTER */}
    <Flex h="100px" flexDirection="column" p={2} pb={0}>
      {/* UPPER FOOTER */}
      <Flex h="40%" w="100%" borderBottom="1px solid #dbdbdb">
        <Flex w="25%" align="center" justify="start">
          <ButtonGroup size="sm" isAttached variant="ghost">
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
              {vote_count}
            </Button>
            <IconButton aria-label="Upvote" icon={<Icon as={IoIosArrowUp} />} />
            <IconButton
              aria-label="Downvote"
              icon={<Icon as={IoIosArrowDown} />}
            />
          </ButtonGroup>
        </Flex>
        <Spacer />
        <Flex w="50%" align="center" justify="end">
          {reactions.map((reaction, i) => (
            <Text fontSize="sm" mr={1} key={i}>
              {reaction.reaction}
            </Text>
          ))}
          <Text fontSize="xs">{prettyReactions(reactions)}</Text>
        </Flex>
      </Flex>

      {/* LOWER FOOTER */}
      <Flex h="60%" w="100%">
        <Flex w="25%" align="center" justify="start">
          <Button size="xs" variant="ghost" h="80%">
            {comment_count} comments
          </Button>
        </Flex>
        <Spacer />
        <Flex w="30%" align="center" justify="end">
          <Button
            size="xs"
            variant="ghost"
            h="80%"
            leftIcon={<Icon as={FaLaughSquint} w={5} h={5} />}
          >
            react
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export default Post;
