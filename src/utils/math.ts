export function unitToRatio(currentValue: number, unitTotal: number): number {
  if (currentValue < 0) {
    throw new Error('value must be positive');
  }

  if (currentValue === 0 || unitTotal === 0) {
    return 0;
  }

  return currentValue / unitTotal;
}

export function unitToPercent(currentValue: number, unitTotal: number): number {
  return unitToRatio(currentValue, unitTotal) * 100;
}

export function percentageToUnit(
  percentage: number,
  unitTotal: number
): number {
  if (percentage < 0) {
    throw new Error('percentage must be positive');
  }

  return (percentage * unitTotal) / 100;
}
