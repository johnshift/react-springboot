import { Box } from "@mui/material";
import React, { useState } from "react";
import { MentionsInput, Mention, MentionItem } from "react-mentions";

import classNames from "../styles/mentions.module.css";

const Center = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
    }}
  >
    {children}
  </Box>
);

const users = [
  {
    id: "walter",
    display: "Walter White",
  },
  {
    id: "jesse",
    display: "Jesse Pinkman",
  },
  {
    id: "gus",
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: "saul",
    display: "Saul Goodman",
  },
  {
    id: "hank",
    display: "Hank Schrader",
  },
  {
    id: "skyler",
    display: "Skyler White",
  },
  {
    id: "mike",
    display: "Mike Ehrmantraut",
  },
  {
    id: "lydia",
    display: "Lydìã Rôdarté-Qüayle",
  },
];
const defaultStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

const TestPage = () => {
  const [postBody, setPostBody] = useState("");
  const [mentions, setMentions] = useState<MentionItem[]>([]);

  const onChangeHandler = (
    event: { target: { value: string } },
    newValue: string,
    newPlainTextValue: string,
    _mentions: MentionItem[]
  ) => {
    console.log("newValue: ", newValue);
    console.log("newPlainTextValue: ", newPlainTextValue);
    setMentions(_mentions);
    return setPostBody(event.target.value);
  };

  return (
    <Center>
      {mentions.map((mention) => (
        <p>{mention.display}</p>
      ))}
      <Box sx={{ width: "50%", margin: "100px auto" }}>
        <MentionsInput
          value={postBody}
          onChange={onChangeHandler}
          // style={defaultStyle}
          className="mentions"
          classNames={classNames}
          placeholder="use @ to mention"
        >
          <Mention
            markup="^__display__^"
            trigger="@"
            // style={{ color: "red" }}
            data={users}
            className={classNames.mentions__mention}
            // renderSuggestion={this.renderUserSuggestion}
          />
        </MentionsInput>
      </Box>
    </Center>
  );
};
export default TestPage;
