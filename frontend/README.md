# Decisions

- lighthouse:
  - `100 100 100 100`: lighthouse score (non-negotiable)
- code-split:
  - `React Suspense`: lazy load components to exclude to bundle
  - `Skeleton`: fallback for lazy loaded components using `css shimmer`
- css:
  - `CSS Modules`: performant code-splitting (1 global + 1 per page)
  - `clamp`: responsive styles
  - `classNames util`: dynamic class styles
- unit/integration:
  - `jest + testing-library`: standard react tests
  - `jest-fetch-mock`: mock api response of fetch
- e2e:
  - `Cypress`: framework for end-to-end tests
  - `env vars`: use environment variables for local/ci settings
