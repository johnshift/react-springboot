import { KeyboardEventHandler, MouseEventHandler, RefObject } from "react";
import {
  Mention,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from "react-mentions";

import fixedClassNames from "../../../styles/fixedMentions.module.css";
import responsiveClassNames from "../../../styles/responsiveMentions.module.css";

interface Props {
  placeholder: string;
  body?: string;
  mentionsHint?: SuggestionDataItem[];
  inputRef?: RefObject<HTMLTextAreaElement>;
  onChange?: OnChangeHandlerFunc;
  onClick?: MouseEventHandler<HTMLTextAreaElement>;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement>;
  onBlur?: (e: any) => void;

  fixedHeight?: boolean;
}

const MentionsField = (props: Props) => {
  const {
    mentionsHint,
    placeholder,
    body = "",
    inputRef,
    onChange,
    onClick,
    onKeyUp,
    onBlur,
    fixedHeight = false,
  } = props;

  const classNames = fixedHeight ? fixedClassNames : responsiveClassNames;

  return (
    <MentionsInput
      className="mentions"
      classNames={classNames}
      placeholder={placeholder}
      value={body}
      inputRef={inputRef}
      onChange={onChange}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
    >
      <Mention
        trigger="@"
        markup="^__display__^"
        className={classNames.mentions__mention}
        data={mentionsHint as SuggestionDataItem[]}
        appendSpaceOnAdd
      />
    </MentionsInput>
  );
};

export default MentionsField;
