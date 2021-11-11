export function prettyDate(dateStr: string): string {
  var seconds = Math.floor(
    (new Date().valueOf() - Date.parse(dateStr).valueOf()) / 1000
  );

  if (seconds <= 0) {
    return "just now";
  }

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;

  return Math.floor(interval) + " minutes ago";
}
