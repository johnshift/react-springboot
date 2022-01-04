import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme.css";

export const button = recipe({
  base: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "inherit",
  },

  variants: {
    color: {
      default: { background: vars.colors.default },
      primary: { background: vars.colors.red },
    },
  },

  defaultVariants: {
    color: "primary",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
