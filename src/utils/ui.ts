/**
 * Constrains a value to boundaries.
 */
export function bounded(
  x: number,
  lowerBound: number,
  upperBound: number
): number {
  if (lowerBound > upperBound) {
    throw Error('`lowerBound` bust be lower than `upperBound`');
  }

  if (x - lowerBound < 0) {
    return lowerBound;
  } else if (x - upperBound > 0) {
    return upperBound;
  }

  return x;
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
