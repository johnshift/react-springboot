import { lazy } from 'preact/compat';

const minLazy = (lazyImport: Function, delay = 300) => {
  return lazy(() =>
    Promise.all([lazyImport(), new Promise((resolve) => setTimeout(resolve, delay))]).then(
      ([moduleExports]) => {
        return moduleExports.default;
      },
    ),
  );
};

export default minLazy;
