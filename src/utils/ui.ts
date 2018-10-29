/**
 * Constrains input value to boundaries.
 * This can be used to ensure a slider recorded value is never
 * less than slider's minimum value nor more than slider's maximum value.
 *
 * @param x {number} The value to apply boundaries on
 * @param lowerBound {number} The lower bound
 * @param upperBound {number} The upper bound
 * @returns The bounded value
 */
export function bounded(
  x: number,
  lowerBound: number,
  upperBound: number
): number {
  const relativeX = x - lowerBound;

  if (relativeX < 0) {
    return 0;
  } else if (relativeX > upperBound) {
    return upperBound;
  }

  return relativeX;
}

function randString(length: number = 4): string {
  const str = Math.random()
    .toString(36)
    .substring(2, length + 2);
  return str;
}

export function uuid(length: number = 6): string {
  const len = length / 2;
  const head = randString(Math.floor(len));
  const tail = randString(Math.ceil(len));

  return `${head}${tail}`;
}
