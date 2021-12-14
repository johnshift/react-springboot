const sleep = async (delay: number) => {
  await new Promise((r) => setTimeout(r, delay));
};

export default sleep;
