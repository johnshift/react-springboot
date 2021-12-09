const cache: any = {};

export default function cachedFetch<T>(
  url: string,
  fetcher: () => Promise<T>
): T {
  if (!cache[url]) {
    let data: any;
    let promise: Promise<any>;
    cache[url] = () => {
      if (data !== undefined) return data;
      if (!promise) promise = fetcher().then((r: any) => (data = r));
      throw promise;
    };
  }
  return cache[url]();
}
