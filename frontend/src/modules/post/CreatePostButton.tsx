import {
  GridItem,
  Flex,
  ButtonGroup,
  Button,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";
import { GiDoubleFaceMask } from "react-icons/gi";

import { useState } from "react";
import useStore from "../../store";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { PostInput } from "../../types";

type Props = {
  setValue: UseFormSetValue<PostInput>;
  getValues: UseFormGetValues<PostInput>;
};

const CreatePostButton = ({ getValues, setValue }: Props) => {
  const toast = useToast();
  const [asVeil, setAsVeil] = useState(true);
  const { addPost, auth_name } = useStore();

  return (
    <GridItem
      rowSpan={2}
      colSpan={[5, 4, 4]}
      // border="1px solid teal"
      mr={[1, 2]}
    >
      <Flex align="center" justify="end" h="100%">
        <ButtonGroup size="md" isAttached variant="outline" color="blackt">
          <Button
            // onClick={() => {
            //   addPost({
            //     id: -1, // placeholder to pass typescript Post type
            //     comment_count: 0,
            //     vote_count: 0,
            //     body: getValues("body"),
            //     owner: auth_name,
            //     created: prettyDate(new Date().toISOString()),
            //     reactions: [],
            //   });

            //   // clear postbody
            //   setValue("body", "");
            // }}
            type="submit"
          >
            Post
          </Button>
          <IconButton
            aria-label="post as"
            icon={
              <Icon as={asVeil ? MdPerson : GiDoubleFaceMask} w={6} h={6} />
            }
            onClick={() => {
              setAsVeil(!asVeil);
              setValue("asVeil", asVeil);
              toast.closeAll();
              toast({
                title: asVeil
                  ? "Posting as your Veil"
                  : "Posting as " + auth_name,
                description: asVeil
                  ? "Only your veil profile will be visible in your post"
                  : "Your public profile will be visible in your post",
                position: "top",
                status: "info",
              });
            }}
          />
        </ButtonGroup>
      </Flex>
    </GridItem>
  );
};

export default CreatePostButton;
