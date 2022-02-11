import { Mention, MentionItem, MentionsInput } from "react-mentions";

import useCreatePost from "./CreatePostContext";

import classNames from "../../styles/mentions.module.css";

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
    <MentionsInput
      className="mentions"
      placeholder={
        "Share something anonymously! \n\nUse '@' to tag someone.\nYou can also schedule the post."
      }
      classNames={classNames}
      value={postBody}
      inputRef={postBodyRef}
      onChange={onChange}
      onClick={handleCursorPos}
      onKeyUp={handleCursorPos}
      onBlur={handleCursorPos}
    >
      <Mention
        trigger="@"
        markup="^__display__^"
        className={classNames.mentions__mention}
        data={mentionsHint}
        appendSpaceOnAdd
      />
    </MentionsInput>
  );
};

export default CreatePostField;
