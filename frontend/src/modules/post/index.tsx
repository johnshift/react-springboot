import { Box, useDisclosure } from "@chakra-ui/react";

import { Post as PostT } from "../../types";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import useStore from "../../store";
import EmojiSelection from "../../common/components/EmojiSelection";

const Post = ({
  id,
  owner,
  created,
  body,
  reactions,
  comment_count,
  vote_count,
}: PostT) => {
  const { name: auth_name, updatePostVote, addReaction } = useStore();

  const {
    isOpen: isOpenEmoji,
    onOpen: openEmoji,
    onClose: closeEmoji,
  } = useDisclosure();

  const onSelectEmoji = (emoji: string) => {
    console.log("selected emoji: ", emoji);
    closeEmoji();
    addReaction(id, emoji);
  };

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
      <PostHeader owner={owner} created={created} />
      <PostBody body={body} />
      <PostFooter
        id={id}
        auth_name={auth_name}
        reactions={reactions}
        comment_count={comment_count}
        vote_count={vote_count}
        onOpenEmoji={openEmoji}
        updatePostVote={updatePostVote}
      />

      <EmojiSelection
        isOpen={isOpenEmoji}
        onClose={closeEmoji}
        selectEmoji={onSelectEmoji}
      />
    </Box>
  );
};

export default Post;
