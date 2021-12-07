import { Flex, GridItem, Icon, IconButton } from '@chakra-ui/react';
import { IoMdHeart, IoIosAt, IoIosCalendar } from 'react-icons/io';
import EmojiSelection from '../../common/components/EmojiSelection';

const SelectEmojiIcon = ({ openEmoji }: { openEmoji: () => void }) => (
  <IconButton
    color="blackt"
    variant="outline"
    border="none"
    aria-label="select emoji"
    icon={<Icon as={IoMdHeart} w={6} h={6} />}
    isRound
    onClick={openEmoji}
    data-testid="select-emoji-icon"
  />
);

const MentionIcon = () => (
  <IconButton
    color="blackt"
    variant="outline"
    border="none"
    aria-label="mention someone"
    icon={<Icon as={IoIosAt} w={6} h={6} />}
    isRound
  />
);

const ScheduleIcon = () => (
  <IconButton
    color="blackt"
    variant="outline"
    border="none"
    aria-label="schedule post"
    icon={<Icon as={IoIosCalendar} w={6} h={6} />}
    isRound
  />
);

type Props = {
  openEmoji: () => void;
  isOpenEmoji: boolean;
  closeEmoji: () => void;
  selectEmoji: (emoji: string) => void;
};

const CreatePostOptions = ({ openEmoji, isOpenEmoji, closeEmoji, selectEmoji }: Props) => {
  return (
    <GridItem rowSpan={2} colSpan={[5, 5, 6]} ml={[-1, 1]}>
      <Flex align="center" justify="start" h="100%">
        <SelectEmojiIcon openEmoji={openEmoji} />
        <MentionIcon />
        <ScheduleIcon />

        <EmojiSelection isOpen={isOpenEmoji} onClose={closeEmoji} selectEmoji={selectEmoji} />
      </Flex>
    </GridItem>
  );
};

export default CreatePostOptions;
