import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import {
  Mention,
  MentionItem,
  MentionsInput,
  SuggestionDataItem,
} from "react-mentions";
import getInitials from "../../../lib/getInitials";

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
    console.log("mentionField onAdd id =", id, " display =", display);
  };

  const renderSuggestion = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean
  ) => {
    console.log("suggestion =", suggestion);
    console.log("search =", search);
    console.log("index =", index);
    console.log("focused =", focused);

    return (
      <MenuItem sx={{ py: 1 }} component="div">
        <ListItemAvatar>
          <Avatar alt={suggestion.display}>
            {getInitials(suggestion.display as string)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={suggestion.display} />
      </MenuItem>
    );
  };

  return (
    <MentionsInput
      className="mentions"
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
        renderSuggestion={renderSuggestion}
      />
    </MentionsInput>
  );
};

export default MentionsFieldX;
