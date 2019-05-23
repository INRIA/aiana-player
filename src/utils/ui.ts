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
