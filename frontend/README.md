## Stack

- `Pnpm`: :zap: install deps
- `Vite`: :zap: reload/builds
- `Preact`: :zap: 4kb payload
- `Vanilla-Extract`: :zap: css-in-ts dev, css-file outputs
- `Code Splitting`: only send needed files :+1:
- `Eslint` + `Prettier`: neat code :ok_hand:
- `Jest + @testing-library/preact`: testing best practices :+1:

## Notes

- Critical js/css payload size should always be less than `vendor.js` payload size.
  This is to make sure that when `vendor.js` is downloaded, all critical js/css is done too.
- Always reuse string constants whenever possible. Also take note of modular code bundles.
- `fallback` components should be bundled in main css and js to enforce code split by features/pages
