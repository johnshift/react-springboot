import useCreatePost from "./CreatePostContext";
import MentionsField from "../../common/components/mentions/MentionsField";

const CreatePostField = () => {
  const {
    postBody,
    setPostBody,
    setPostBodyPlain,
    mentionsHint,
    setMentions,
    cursorPos,
    setCursorPos,
    fieldRef,
  } = useCreatePost();

  return (
    <MentionsField
      placeholder={
        "Share something anonymously! \n\nUse '@' to tag someone.\nYou can also schedule the post."
      }
      body={postBody}
      setBody={setPostBody}
      setBodyPlain={setPostBodyPlain}
      mentionsHint={mentionsHint}
      cursorPos={cursorPos}
      setCursorPos={setCursorPos}
      setMentions={setMentions}
      fixedHeight
      fieldRef={fieldRef}
    />
  );
};

export default CreatePostField;
