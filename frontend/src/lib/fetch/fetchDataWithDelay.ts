import { randDelay } from "../common/randDelay";

export default async function fetchData(url: string) {
  const [res] = await Promise.all([
    fetch(url),
    new Promise((resp) => setTimeout(resp, randDelay(200, 1500))),
  ]);
  if (res.status !== 200) {
    throw new Error(`Status ${res.status}`);
  }
  return res.json();
}
