export function range(size: number, start = 0) {
  return [...Array(size).keys()].map((i) => i + start);
}
