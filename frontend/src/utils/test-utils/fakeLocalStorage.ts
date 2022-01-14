type Store = {
  [key: string]: string;
};

interface Stringable {
  toString: () => string;
}

const fakeLocalStorage = (() => {
  let store: Store = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: Stringable) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

export default fakeLocalStorage;
