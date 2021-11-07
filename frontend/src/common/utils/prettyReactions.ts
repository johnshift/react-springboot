import { Reaction } from "../../types";

export const prettyReactions = (reactions: Reaction[]): string => {
  if (reactions.length == 0) {
    return "Be the first to react";
  }

  if (reactions.length == 1) {
    return reactions[0].owner;
  }

  let others = " other";
  if (reactions.length > 2) {
    others += "s";
  }

  return reactions[0].owner + " and " + (reactions.length - 1) + others;
};
