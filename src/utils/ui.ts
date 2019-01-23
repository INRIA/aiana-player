/**
 * Constrains a value to boundaries.
 *
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
 *
 * @param length - The length of the generated string (default: 4)
 */
function randString(length: number = 4): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

/**
 * Generates a unique string identifer.
 *
 * @param length {number} The length of the generated identifier (default: 6)
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
