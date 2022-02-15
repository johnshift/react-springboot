import { Dispatch, RefObject, SetStateAction } from "react";
import {
  Mention,
  MentionItem,
  MentionsInput,
  SuggestionDataItem,
} from "react-mentions";

import fixedClassNames from "./fixed.module.css";
import responsiveClassNames from "./responsive.module.css";

interface Props {
  placeholder: string;

  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  setBodyPlain: Dispatch<SetStateAction<string>>;

  mentionsHint: SuggestionDataItem[];
  cursorPos: number;
  setCursorPos: Dispatch<SetStateAction<number>>;
  setMentions: Dispatch<SetStateAction<SuggestionDataItem[]>>;
  fixedHeight?: boolean;

  // fieldRef: RefObject<HTMLTextAreaElement>;
}

const MentionsFieldX = (props: Props) => {
  const {
    placeholder,

    body,
    setBody,
    setBodyPlain,

    mentionsHint,
    cursorPos,
    setCursorPos,
    setMentions,
    fixedHeight = false,
    // fieldRef,
  } = props;

  const classNames = fixedHeight ? fixedClassNames : responsiveClassNames;

  const handleCursorPos = (e: any) => {
    setCursorPos((e.target as HTMLTextAreaElement).selectionStart);
  };

  const onChange = (
    event: { target: { value: string } },
    _newValue: string,
    _newPlainTextValue: string,
    _mentions: MentionItem[]
  ) => {
    setMentions(_mentions);
    setBodyPlain(_newPlainTextValue);
    return setBody(_newValue);
  };

  const onAdd = (
    id: string | number,
    display: string,
    startPos: number,
    endPos: number
  ) => {
    setCursorPos(cursorPos + display.length);
    console.log("add startpos: ", startPos);
  };

  return (
    <MentionsInput
      classNames={classNames}
      placeholder={placeholder}
      value={body}
      onClick={handleCursorPos}
      onKeyUp={handleCursorPos}
      onBlur={handleCursorPos}
      onChange={onChange}
      // inputRef={fieldRef}
    >
      <Mention
        trigger="@"
        markup="@[__display__](__id__)"
        className={classNames.mentions__mention}
        data={mentionsHint}
        appendSpaceOnAdd
        onAdd={onAdd as (id: string | number, display: string) => void}
      />
    </MentionsInput>
  );
};

export default MentionsFieldX;
