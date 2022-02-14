import React from "react";
interface MentionMetadata {
  text?: string;
  url?: string;
  newLine?: boolean;
}

const SPLIT_PATTERN = /(@\[[^\]]+\]\([^)]+\))/;
const MENTION_PATTERN = /(?:@\[([^\]]+)\]\(([^)]+)\))/;

/**
 * @[my lab](my-lab)
 * i love you 🥰 🥰 🥰
 * <br />
 * <br />
 * Remember I'm always here ...
 * <br />
 * <br />
 * Whenever you're ✨horny✨ 👅 💦 👍
 * <br />
 * <br />
 * 👅 💦 👍
 */

export default function useMentionsMetadata(text: string): MentionMetadata[] {
  return React.useMemo(() => {
    const parts = text.split(SPLIT_PATTERN).filter((part) => part !== "");
    console.log("parts =", parts);

    let result: MentionMetadata[] = [];
    for (const part of parts) {
      if (part.startsWith("@")) {
        const match = part.match(MENTION_PATTERN);
        if (!match || match.length < 3) {
          result.push({ text: part });
        }
        const [, name, params] = match!;

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

  // return React.useMemo(() => {
  //   const parts = text.split(SPLIT_PATTERN);

  //   const convertPartToMetadata = (part: string): MentionMetadata => {
  //     // buf new Part

  //     // every nextline should indicate a breakline

  //     if (!part.startsWith("@")) {
  //       return { text: part };
  //     }

  //     const match = part.match(MENTION_PATTERN);

  //     if (!match || match.length < 3) {
  //       return { text: part };
  //     }

  //     const [, name, params] = match;

  //     return { text: name, url: params };
  //   };

  //   return parts.filter((part) => part !== "").map(convertPartToMetadata);
  // }, [text]);
}
