import {
  GridItem,
  Flex,
  IconButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";

import { IoMdHeart, IoIosAt, IoIosCalendar } from "react-icons/io";
import EmojiSelection from "../../common/components/EmojiSelection";

type Props = {
  openEmoji: () => void;
  isOpenEmoji: boolean;
  closeEmoji: () => void;
  finalRef: MutableRefObject<HTMLTextAreaElement>;
  selectEmoji: (emoji: string) => void;
};

const CreatePostOptions = ({
  openEmoji,
  isOpenEmoji,
  closeEmoji,
  finalRef,
  selectEmoji,
}: Props) => {
  return (
    <GridItem rowSpan={2} colSpan={[5, 5, 6]} ml={[-1, 1]}>
      <Flex align="center" justify="start" h="100%">
        <SelectEmojiIcon openEmoji={openEmoji} />
        <MentionIcon />
        <ScheduleIcon />

        <Modal
          isOpen={isOpenEmoji}
          onClose={closeEmoji}
          isCentered
          scrollBehavior="inside"
          blockScrollOnMount={false}
          finalFocusRef={finalRef}
        >
          <ModalOverlay />
          <ModalContent w="300px" maxH="300px">
            <ModalHeader textAlign="center">Select Emoji</ModalHeader>
            <ModalBody>
              <EmojiSelection selectEmoji={selectEmoji} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </GridItem>
  );
};

export default CreatePostOptions;

const SelectEmojiIcon = ({ openEmoji }: { openEmoji: () => void }) => (
  <IconButton
    color="blackt"
    variant="outline"
    border="none"
    aria-label="select emoji"
    icon={<Icon as={IoMdHeart} w={6} h={6} />}
    isRound
    onClick={openEmoji}
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
