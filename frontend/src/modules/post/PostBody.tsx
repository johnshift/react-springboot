import { Flex, Box } from "@chakra-ui/react";

type Props = {
  body: string;
};

const PostBody = ({ body }: Props) => (
  <Flex
    w="100%"
    px={5}
    // minH="40px"
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
);

export default PostBody;
