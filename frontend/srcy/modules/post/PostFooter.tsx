import { Flex, useDisclosure } from "@chakra-ui/react";

import { Reaction } from "../../types/reaction";
import PostLowerFooter from "./PostLowerFooter";
import PostUpperFooter from "./PostUpperFooter";

type Props = {
  id: number;
  auth_name: string;
  reactions: Reaction[];
  comment_count: number;
  vote_count: number;
  onOpenEmoji: () => void;
  updatePostVote: (id: number, inc: number) => void;
};

const PostFooter = ({
  id,
  auth_name,
  reactions,
  comment_count,
  onOpenEmoji,
  vote_count,
  updatePostVote,
}: Props) => {
  return (
    <Flex h="100px" flexDirection="column" p={2} pb={0}>
      <PostUpperFooter
        id={id}
        reactions={reactions}
        vote_count={vote_count}
        updatePostVote={updatePostVote}
      />
      <PostLowerFooter
        auth_name={auth_name}
        reactions={reactions}
        comment_count={comment_count}
        onOpenEmoji={onOpenEmoji}
      />
    </Flex>
  );
};

export default PostFooter;
