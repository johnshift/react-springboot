import { Box } from "@mui/material";

import MentionsField from "../../../common/components/mentions/MentionsField";

import { useCreatePostCtx } from ".";

const CreatePostInput = () => {
  const {
    body,
    setBody,
    setBodyPlain,
    mentionsHint,
    setMentions,
    cursorPos,
    setCursorPos,
  } = useCreatePostCtx();

  return (
    <Box sx={{ mb: 2 }}>
      <MentionsField
        placeholder={
          "Share something anonymously! \n\nUse '@' to tag someone.\nYou can also schedule the post."
        }
        body={body}
        setBody={setBody}
        setBodyPlain={setBodyPlain}
        mentionsHint={mentionsHint}
        cursorPos={cursorPos}
        setCursorPos={setCursorPos}
        setMentions={setMentions}
        fixedHeight
      />
    </Box>
  );
};

export default CreatePostInput;
