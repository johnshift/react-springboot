import { Flex, Button, Spacer, Text, Icon } from "@chakra-ui/react";
import { Reaction } from "../../types";

import { FaLaughSquint } from "react-icons/fa";

type Props = {
  auth_name: string;
  reactions: Reaction[];
  comment_count: number;
  onOpenEmoji: () => void;
};

const PostLowerFooter = ({
  auth_name,
  reactions,
  comment_count,
  onOpenEmoji,
}: Props) => {
  let own_reaction = "";
  for (const reaction of reactions) {
    if (reaction.owner == "You") {
      own_reaction = reaction.reaction;
      break;
    }
  }

  return (
    <Flex h="60%" w="100%">
      <Flex w="25%" align="center" justify="start">
        <Button size="xs" variant="ghost" h="80%" aria-label="show comments">
          {comment_count} comments
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
  );
};

export default PostLowerFooter;
