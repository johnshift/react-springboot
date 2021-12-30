export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const randNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randSleep = async (maxDelay = 3000) => {
  return new Promise((r) => setTimeout(r, randNum(300, maxDelay)))
}
