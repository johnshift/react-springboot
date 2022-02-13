import { Mention, MentionItem, MentionsInput } from "react-mentions";

import useCreatePost from "./CreatePostContext";

import classNames from "../../styles/mentions.module.css";
import MentionsField from "../../common/components/mentions/MentionsField";

const CreatePostField = () => {
  const {
    postBody,
    setPostBody,
    setPostBodyPlain,
    postBodyRef,
    mentionsHint,
    setMentions,
    setCursorPos,
  } = useCreatePost();

  const onChange = (
    event: { target: { value: string } },
    _newValue: string,
    _newPlainTextValue: string,
    _mentions: MentionItem[]
  ) => {
    setMentions(_mentions);
    setPostBodyPlain(_newPlainTextValue);
    return setPostBody(_newValue);
  };

  const handleCursorPos = (e: any) => {
    setCursorPos((e.target as HTMLTextAreaElement).selectionStart);
  };

  return (
    <MentionsField
      mentionsHint={mentionsHint}
      placeholder={
        "Share something anonymously! \n\nUse '@' to tag someone.\nYou can also schedule the post."
      }
      body={postBody}
      inputRef={postBodyRef}
      onChange={onChange}
      onClick={handleCursorPos}
      onKeyUp={handleCursorPos}
      onBlur={handleCursorPos}
      fixedHeight
    />
  );
};

export default CreatePostField;
