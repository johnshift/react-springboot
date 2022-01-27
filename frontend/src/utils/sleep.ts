const sleep = (delay = 300) => {
  return new Promise((r) => setTimeout(r, delay));
};

export default sleep;
