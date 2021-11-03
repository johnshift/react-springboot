import { GridItem } from "@chakra-ui/react";
import Avatar from "../../common/components/Avatar";

const CreatePostImage = () => (
  <GridItem
    ml={1}
    rowSpan={6}
    colSpan={[2, 3, 2]}
    // bg="teal.200"
  >
    <Avatar href="/user_1" />
  </GridItem>
);

export default CreatePostImage;
