/**
 * Takes a value and constrains it to boundaries.
 * For example, this can be used to ensure a slider recorded value is never
 * less than slider's minimum value nor more than slider's maximum value.
 *
 * @param x {number} The value to apply boundaries on
 * @param lowerBound {number} The lower bound
 * @param upperBound {number} The upper bound
 * @returns {number}
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
