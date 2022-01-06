import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { colors } from "../../theme.css";

export const button = recipe({
  base: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "inherit",
    borderRadius: "0.5rem",
    ":active": {
      transform: "translateY(0.125rem)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      transitionProperty: "background-color",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "200ms",
    },
  },

  variants: {
    color: {
      default: {
        backgroundColor: colors.smoke,
        border: "1px solid " + colors.gray,
        ":active": {
          backgroundColor: colors.smokeDim,
        },
      },
      primary: { backgroundColor: colors.red },
    },
  },

  defaultVariants: {
    color: "default",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
