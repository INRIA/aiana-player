import { percentageToUnit, unitToPercent } from './math';

describe('convert unit to percentages', () => {
  const unitTotal = 25;

  test('with valid values', () => {
    expect(unitToPercent(0, unitTotal)).toBe(0);
    expect(unitToPercent(2.5, unitTotal)).toBe(10);
    expect(unitToPercent(25, unitTotal)).toBe(100);
  });

  test('negative value throws an error', () => {
    expect(() => {
      unitToPercent(-10, unitTotal);
    }).toThrowError();
  });
});

describe('convert percentages to units', () => {
  const unitTotal = 25;

  test('with valid values', () => {
    expect(percentageToUnit(0, unitTotal)).toBe(0);
    expect(percentageToUnit(10, unitTotal)).toBe(2.5);
    expect(percentageToUnit(100, unitTotal)).toBe(unitTotal);
  });

  test('negative value throws an error', () => {
    expect(() => {
      percentageToUnit(-10, unitTotal);
    }).toThrowError();
  });
});
