export const timeSince = (ts: string): string => {
  const created = new Date(ts);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  }

  let interval = Math.floor(seconds / 60);

  const prettyDate = (str: string) => {
    const num = Math.floor(interval);
    return `${num} ${str}${num !== 1 ? "s" : ""} ago`;
  };
  if (interval < 60) {
    return prettyDate("min");
  }

  interval = Math.floor(seconds / 3600);
  if (interval < 24) {
    return prettyDate("hour");
  }

  interval = Math.floor(seconds / 86400);
  if (interval < 7) {
    if (interval === 1) {
      return "yesterday";
    }
    return prettyDate("day");
  }

  interval = Math.floor(seconds / 31536000);
  const dateOptions = {
    month: "short",
    day: "2-digit",
    year: interval === 0 ? undefined : "numeric",
  } as Intl.DateTimeFormatOptions;

  return created.toLocaleDateString("en-US", dateOptions);
};
