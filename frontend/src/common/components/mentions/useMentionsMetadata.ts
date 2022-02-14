import React from "react";
interface MentionMetadata {
  text: string;
  url?: string;
}

const SPLIT_PATTERN = /(@\[[^\]]+\]\([^)]+\))/;
const MENTION_PATTERN = /(?:@\[([^\]]+)\]\(([^)]+)\))/;

export default function useMentionsMetadata(text: string): MentionMetadata[] {
  return React.useMemo(() => {
    const parts = text.split(SPLIT_PATTERN);
    console.log("parts =", parts);

    const convertPartToMetadata = (part: string): MentionMetadata => {
      if (!part.startsWith("@")) {
        return { text: part };
      }

      const match = part.match(MENTION_PATTERN);
      console.log("match =", match);

      if (!match || match.length < 3) {
        return { text: part };
      }

      const [, name, params] = match;

      return { text: name, url: params };
    };

    return parts.filter((part) => part !== "").map(convertPartToMetadata);
  }, [text]);
}
