import {
  Flex,
  Button,
  Spacer,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";

import { FaLaughSquint } from "react-icons/fa";
import { PostCtx } from "./Post";

import EmojiSelection from "../../components/EmojiSelection";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

const PostFooter = () => {
  const { commentCount, reactions } = useContext(PostCtx);

  let own_reaction = "";
  for (const reaction of reactions) {
    if (reaction.owner == "You") {
      own_reaction = reaction.reaction;
      break;
    }
  }

  const {
    isOpen: isOpenEmoji,
    onOpen: onOpenEmoji,
    onClose: onCloseEmoji,
  } = useDisclosure();

  const onSelectEmoji = async (emoji: string) => {
    onCloseEmoji();

    console.log("selected emoji: ", emoji);

    await axios.post(BACKEND_API_URL + "/reactions", {
      emoji: emoji,
    });

    // addReaction(id, emoji);
  };

  return (
    <>
      <Flex h="60%" w="100%">
        <Flex w="25%" align="center" justify="start">
          <Button size="xs" variant="ghost" h="80%" aria-label="show comments">
            {commentCount} comments
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
            aria-label="react to post"
          >
            <Text fontSize="xl" mr={1}>
              {own_reaction}
            </Text>{" "}
            react
          </Button>
        </Flex>
      </Flex>

      <EmojiSelection
        isOpen={isOpenEmoji}
        onClose={onCloseEmoji}
        selectEmoji={onSelectEmoji}
      />
    </>
  );
};

export default PostFooter;
