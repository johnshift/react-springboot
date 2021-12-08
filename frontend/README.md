## Notes

- Support for React Server Components is very limited. Only WindiCss works with RSC.  
  Take note that, the cli must be installed on frontend server to compile windicss.
- Each server component fetching data must be wrapped in `React Suspense` and provide customized `fallback` for it.
- Each route must be server rendered (`<page-route>.server.tsx`) with `Page.client.tsx` root component declaring title and meta data for each page.
