# CI Improvements

- `pnpm` + `vitejs` cuts vercel deployment by `45 secs` :bangbang:
- running `parallel unit + integration tests` cuts backend tests by `30 secs` :bangbang:
- manually setting `MAVEN_CUSTOM_GOALS="clean install"` in heroku saves `20 secs` in backend deployment
- using `preact` framework preset by vercel cuts `15 secs`
- using `pnpm` for end-to-end tests saves `10 secs`
