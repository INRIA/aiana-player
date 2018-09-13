export function unitToPercent(currentValue: number, unitTotal: number): number {
  if (currentValue < 0) {
    throw new Error('currentValue should be positive');
  }

  return (currentValue * 100) / unitTotal;
}

export function percentageToUnit(
  percentage: number,
  unitTotal: number
): number {
  if (percentage < 0) {
    throw new Error('Percentage should be positive');
  }

  return (percentage * unitTotal) / 100;
}
