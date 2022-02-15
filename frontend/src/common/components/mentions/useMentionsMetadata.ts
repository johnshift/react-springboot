import React from "react";
interface MentionMetadata {
  text?: string;
  url?: string;
  newLine?: boolean;
}

const SPLIT_PATTERN = /(@\[[^\]]+\]\([^)]+\))/;
const MENTION_PATTERN = /(?:@\[([^\]]+)\]\(([^)]+)\))/;

/*
	loop parts

	if starts with "@"
		match mention-pattern
			if match -> push part to result
			else -> get name+url then push

	else:
		declare buf
		loop chars of part
			if not newline
				append to buf
			else 
				push buf to result (if not empty)
				push newline to result
				reset buf
		push buf to result (if not empty)
*/

export default function useMentionsMetadata(text: string): MentionMetadata[] {
  return React.useMemo(() => {
    const parts = text.split(SPLIT_PATTERN).filter((part) => part !== "");

    let result: MentionMetadata[] = [];

    for (const part of parts) {
      if (part.startsWith("@")) {
        const match = part.match(MENTION_PATTERN);
        if (!match || match.length < 3) {
          result.push({ text: part });
          continue;
        }
        const [, name, params] = match;

        result.push({ text: name, url: params });
        continue;
      }

      let str = "";

      for (const c of part) {
        if (c !== "\n" && c !== "\r") {
          str += c;
        } else {
          if (str.length !== 0) {
            result.push({ text: str });
          }
          result.push({ newLine: true });

          str = "";
        }
      }

      if (str.length !== 0) {
        result.push({ text: str });
      }
    }

    return result;
  }, [text]);
}
