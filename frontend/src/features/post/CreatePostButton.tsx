import { Button, ButtonGroup, Flex, GridItem, Icon, IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { MdPerson } from 'react-icons/md';
import { GiDoubleFaceMask } from 'react-icons/gi';

const CreatePostButton = () => {
  const toast = useToast();
  const [asVeil, setAsVeil] = useState(true);

  // todo: retrieve from db
  const name = 'John Ballesteros';

  return (
    <GridItem
      rowSpan={2}
      colSpan={[5, 4, 4]}
      // border="1px solid teal"
      mr={[1, 2]}>
      <Flex align="center" justify="end" h="100%">
        <ButtonGroup size="md" isAttached variant="outline" color="blackt">
          <Button type="submit">Post</Button>
          <IconButton
            aria-label="post as"
            icon={<Icon as={asVeil ? MdPerson : GiDoubleFaceMask} w={6} h={6} />}
            onClick={() => {
              setAsVeil(!asVeil);
              toast.closeAll();
              toast({
                title: asVeil ? 'Posting as your Veil' : 'Posting as ' + name,
                description: asVeil
                  ? 'Only your veil profile will be visible in your post'
                  : 'Your public profile will be visible in your post',
                position: 'top',
                status: 'info'
              });
            }}
          />
        </ButtonGroup>
      </Flex>
    </GridItem>
  );
};

export default CreatePostButton;
