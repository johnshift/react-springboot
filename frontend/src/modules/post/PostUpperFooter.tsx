import {
  Box,
  Flex,
  ButtonGroup,
  Button,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

import { prettyReactions } from "../../common/utils/prettyReactions";
import useStore from "../../store";

import { Reaction } from "../../types/reaction";
import Avatar from "../../common/components/Avatar";

type Props = {
  id: number;
  reactions: Reaction[];
  vote_count: number;
  updatePostVote: (id: number, inc: number) => void;
};
const PostUpperFooter = ({
  id,
  reactions,
  vote_count,
  updatePostVote,
}: Props) => {
  const { listReactionEmojis, getReactions } = useStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
              {vote_count}
            </Button>
            <IconButton
              aria-label="Upvote"
              icon={<Icon as={IoIosArrowUp} />}
              onClick={() => {
                updatePostVote(id, 1);
              }}
            />
            <IconButton
              aria-label="Downvote"
              icon={<Icon as={IoIosArrowDown} />}
              onClick={() => {
                updatePostVote(id, -1);
              }}
            />
          </ButtonGroup>
        </Flex>
        <Flex
          w="70%"
          align="center"
          justify="end"
          // border="1px solid blue"
          role="button"
          aria-label="show reactions"
          onClick={onOpen}
        >
          {listReactionEmojis(id).map((reaction: string, i: number) => (
            <Text fontSize="sm" mr={1} key={i}>
              {reaction}
            </Text>
          ))}
          <Text fontSize="xs" _hover={{ bg: "whitehl" }} py={2} pl={1} pr={2}>
            {prettyReactions(reactions)}
          </Text>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
        blockScrollOnMount={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w={["100%", "450px"]} maxH="400px">
          <ModalHeader py={0} pt={5}>
            People who reacted
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={5}>
            <Flex justify="start" pl={10} flexDirection="column">
              {getReactions(id).map((reaction, i) => (
                <Flex key={i} h="80px" justify="start" align="center" py={2}>
                  <Avatar
                    size="sm"
                    label="profile image"
                    badgeContent={reaction.reaction}
                  />

                  <Text fontSize="lg" ml={3}>
                    <Link href="#">
                      <a>{reaction.owner}</a>
                    </Link>
                  </Text>
                </Flex>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const ReactionItem = () => (
  <Flex h="80px" justify="start" align="center" py={2}>
    <Avatar size="sm" label="profile image" badgeContent="😁" />

    <Text fontSize="lg" ml={3}>
      John Ballesteros
    </Text>
  </Flex>
);

export default PostUpperFooter;
