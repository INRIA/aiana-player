import { formatHours, leadingZero, secondsToHMS } from './time';

describe('leading zero', () => {
  test('with valid values', () => {
    expect(leadingZero(0)).toBe('00');
    expect(leadingZero(4)).toBe('04');
    expect(leadingZero(23)).toBe('23');
  });

  test('negative value throws an error', () => {
    expect(() => {
      leadingZero(-1);
    }).toThrowError();
  });
});

describe('hours formatting', () => {
  test('with valid values', () => {
    expect(formatHours(0)).toBeNull();
    expect(formatHours(4)).toBe('04');
    expect(formatHours(23)).toBe('23');
    expect(formatHours(100)).toBe('100');
  });

  test('negative value is throwing an error', () => {
    expect(() => {
      formatHours(-1);
    }).toThrowError();
  });
});

describe('convert seconds to clock display format HH:mm:ss', () => {
  test('with valid values', () => {
    expect(secondsToHMS(0)).toBe('00:00');
    expect(secondsToHMS(4)).toBe('00:04');
    expect(secondsToHMS(23)).toBe('00:23');
    expect(secondsToHMS(60)).toBe('01:00');
    expect(secondsToHMS(600)).toBe('10:00');
    expect(secondsToHMS(3600)).toBe('01:00:00');
    expect(secondsToHMS(3666)).toBe('01:01:06');
    expect(secondsToHMS(864671)).toBe('240:11:11');
  });

  test('with a custom separator', () => {
    expect(secondsToHMS(864671, '-')).toBe('240-11-11');
    expect(secondsToHMS(864671, '__')).toBe('240__11__11');
    expect(secondsToHMS(864671, '')).toBe('2401111');
  });
});
