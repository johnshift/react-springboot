import {
  Flex,
  ButtonGroup,
  Button,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { ReactionT } from "../../types";
import { prettyReactions } from "../../utils/prettyReactions";
import { PostCtx } from "./Post";

export const listTopReactions = (reactions: ReactionT[]): string[] => {
  // count number of occurence on each emoji
  let count = reactions.reduce<{ [k: string]: number }>((res, val) => {
    if (res[val.reaction]) {
      res[val.reaction]++;
    } else {
      res[val.reaction] = 1;
    }
    return res;
  }, {});

  let output = Object.entries(count)

    .sort((a, b) => b[1] - a[1]) // sort decsending
    .map((v) => v[0]); // extract the name field

  // only return top 3
  return output.slice(0, 3);
};

const PostInfo = () => {
  const { voteCount, reactions } = useContext(PostCtx);

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
              aria-label="show votes"
            >
              {voteCount}
            </Button>
            <IconButton
              aria-label="upvote"
              icon={<Icon as={IoIosArrowUp} />}
              // onClick={() => {
              //   updatePostVote(id, 1);
              // }}
            />
            <IconButton
              aria-label="downvote"
              icon={<Icon as={IoIosArrowDown} />}
              // onClick={() => {
              //   updatePostVote(id, -1);
              // }}
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
          // onClick={onOpen}
        >
          {listTopReactions(reactions).map((reaction: string, i: number) => (
            <Text
              fontSize="sm"
              mr={1}
              key={i}
              data-testid={"top-" + (i + 1) + "-reaction"}
            >
              {reaction}
            </Text>
          ))}
          <Text fontSize="xs" _hover={{ bg: "whitehl" }} py={2} pl={1} pr={2}>
            {prettyReactions(reactions)}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default PostInfo;
