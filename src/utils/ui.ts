/**
 * Constrains input value to boundaries.
 * This can be used to ensure a slider recorded value is never
 * less than slider's minimum value nor more than slider's maximum value.
 *
 * @param x {number} The value to apply boundaries on
 * @param lowerBound {number} The lower bound
 * @param upperBound {number} The upper bound
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

/**
 * Generates a random string of [0-9a-z] characters
 */
function randString(length: number = 4): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

/**
 * Generates a unique string identifer.
 *
 * @param length {number} the length of the identifier
 */
export function uid(length: number = 6): string {
  if (length < 1) {
    return '';
  }

  const len = length / 2;
  const head = randString(Math.floor(len));
  const tail = randString(Math.ceil(len));

  return `${head}${tail}`;
}
