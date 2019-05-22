/**
 * Calculates the ratio value for a given number and max.
 *
 * @param currentValue
 * @param unitTotal
 */
export function unitToRatio(currentValue: number, unitTotal: number): number {
  if (currentValue === 0 || unitTotal === 0) {
    return 0;
  }

  return currentValue / unitTotal;
}

/**
 * Calculates the percentage value for a given number and max.
 *
 * @param currentValue
 * @param unitTotal
 */
export function unitToPercent(currentValue: number, unitTotal: number): number {
  return unitToRatio(currentValue, unitTotal) * 100;
}

/**
 * Expresses the percentage representation of a given value and max.
 *
 * @param percentage
 * @param unitTotal
 */
export function percentageToUnit(
  percentage: number,
  unitTotal: number
): number {
  return (percentage * unitTotal) / 100;
}

/**
 * Converts an angle expressed in degrees to radians.
 *
 * @param angle The angle expressed in degrees.
 */
export function degToRad(angle: number): number {
  return (angle * Math.PI) / 180;
}
