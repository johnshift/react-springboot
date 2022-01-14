export const sleep = async (delay = 300) => {
  await new Promise((r) => setTimeout(r, delay));
};
