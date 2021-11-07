import { Flex, Box, Center, Text, Avatar } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  owner: string;
  created: string;
};

const PostHeader = ({ owner, created }: Props) => (
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
      <Text fontSize="sm">{created}</Text>
    </Box>
  </Flex>
);

export default PostHeader;
