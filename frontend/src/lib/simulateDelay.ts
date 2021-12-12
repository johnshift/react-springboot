import { randNum } from "./randNum";

export const simulateDelay = () => {
  return new Promise((r) => setTimeout(r, randNum(1000, 2000)));
};
