import {
  I18N_DURATION_HOURS_KEY,
  I18N_DURATION_HOURS_MINUTES_KEY,
  I18N_DURATION_HOURS_MINUTES_SECONDS_KEY,
  I18N_DURATION_HOURS_SECONDS_KEY,
  I18N_DURATION_MINUTES_KEY,
  I18N_DURATION_MINUTES_SECONDS_KEY,
  I18N_DURATION_SECONDS_KEY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE
} from '../constants';
import {
  durationTranslationKey,
  extractHours,
  extractMinutes,
  extractSeconds,
  formatHours,
  formatMinutes,
  leadingZero,
  secondsToHMS,
  secondsToHMSObject
} from '../utils/time';

describe('find translation key for a given time duration', () => {
  test('should format as hours', () => {
    expect(durationTranslationKey(3600)).toBe(I18N_DURATION_HOURS_KEY);
    expect(durationTranslationKey(7200)).toBe(I18N_DURATION_HOURS_KEY);
    expect(durationTranslationKey(36000)).toBe(I18N_DURATION_HOURS_KEY);
  });

  test('should format as minutes', () => {
    expect(durationTranslationKey(60)).toBe(I18N_DURATION_MINUTES_KEY);
    expect(durationTranslationKey(120)).toBe(I18N_DURATION_MINUTES_KEY);
  });

  test('should format as seconds', () => {
    expect(durationTranslationKey(0)).toBe(I18N_DURATION_SECONDS_KEY);
    expect(durationTranslationKey(1)).toBe(I18N_DURATION_SECONDS_KEY);
    expect(durationTranslationKey(2)).toBe(I18N_DURATION_SECONDS_KEY);
  });

  test('should format as hours and minutes and seconds', () => {
    expect(durationTranslationKey(3661)).toBe(
      I18N_DURATION_HOURS_MINUTES_SECONDS_KEY
    );
    expect(durationTranslationKey(7322)).toBe(
      I18N_DURATION_HOURS_MINUTES_SECONDS_KEY
    );
  });

  test('should format as hours and minutes', () => {
    expect(durationTranslationKey(3660)).toBe(I18N_DURATION_HOURS_MINUTES_KEY);
    expect(durationTranslationKey(7320)).toBe(I18N_DURATION_HOURS_MINUTES_KEY);
  });

  test('should format as hours and seconds', () => {
    expect(durationTranslationKey(3601)).toBe(I18N_DURATION_HOURS_SECONDS_KEY);
    expect(durationTranslationKey(7202)).toBe(I18N_DURATION_HOURS_SECONDS_KEY);
  });

  test('should format as minutes and seconds', () => {
    expect(durationTranslationKey(61)).toBe(I18N_DURATION_MINUTES_SECONDS_KEY);
    expect(durationTranslationKey(122)).toBe(I18N_DURATION_MINUTES_SECONDS_KEY);
  });
});

describe('leading zero for display purpose', () => {
  test('with positive integer values', () => {
    expect(leadingZero(0)).toBe('00');
    expect(leadingZero(4)).toBe('04');
    expect(leadingZero(23)).toBe('23');
    expect(leadingZero(1234)).toBe('1234');
    expect(leadingZero(1.4)).toBe('01');
    expect(leadingZero(1.4321)).toBe('01');
    expect(leadingZero(10.4321)).toBe('10');
    expect(leadingZero(123.4321)).toBe('123');
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
    expect(formatHours(4)).toBe('4');
    expect(formatHours(23)).toBe('23');
    expect(formatHours(100)).toBe('100');
  });

  test('negative value is throwing an error', () => {
    expect(() => {
      formatHours(-1);
    }).toThrowError();
  });
});

describe('minutes formatting', () => {
  test('with valid values', () => {
    expect(formatMinutes(0, 0)).toBe('0');
    expect(formatMinutes(0, 1)).toBe('00');
    expect(formatMinutes(10, 0)).toBe('10');
    expect(formatMinutes(10, 1)).toBe('10');
  });
});

describe('HMS representation of seconds', () => {
  test('with valid values', () => {
    expect(secondsToHMSObject(0)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(secondsToHMSObject(1)).toEqual({ hours: 0, minutes: 0, seconds: 1 });
    expect(secondsToHMSObject(60)).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 0
    });
    expect(secondsToHMSObject(3600)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0
    });
    expect(secondsToHMSObject(864671)).toEqual({
      hours: 240,
      minutes: 11,
      seconds: 11
    });
  });
});

describe('convert seconds to clock display format HH:mm:ss', () => {
  test('with valid values', () => {
    expect(secondsToHMS(0)).toBe('0:00');
    expect(secondsToHMS(4)).toBe('0:04');
    expect(secondsToHMS(23)).toBe('0:23');
    expect(secondsToHMS(60)).toBe('1:00');
    expect(secondsToHMS(600)).toBe('10:00');
    expect(secondsToHMS(3600)).toBe('1:00:00');
    expect(secondsToHMS(3666)).toBe('1:01:06');
    expect(secondsToHMS(864671)).toBe('240:11:11');
  });

  test('with a custom separator', () => {
    expect(secondsToHMS(1, '/')).toBe('0/01');
    expect(secondsToHMS(60, '/')).toBe('1/00');
    expect(secondsToHMS(3600, '/')).toBe('1/00/00');

    expect(secondsToHMS(864671, '-')).toBe('240-11-11');
    expect(secondsToHMS(864671, '__')).toBe('240__11__11');
    expect(secondsToHMS(864671, '')).toBe('2401111');
  });
});

describe('time extraction', () => {
  test('hours extraction', () => {
    expect(extractHours(0)).toBe(0);
    expect(extractHours(1800)).toBe(0);
    expect(extractHours(3600)).toBe(1);
    expect(extractHours(3610)).toBe(1);
  });

  test('minutes extraction', () => {
    expect(extractMinutes(0)).toBe(0);
    expect(extractMinutes(3600)).toBe(0);
    expect(extractMinutes(60)).toBe(1);
    expect(extractMinutes(70)).toBe(1);
  });

  test('seconds extraction', () => {
    expect(extractSeconds(0)).toBe(0);
    expect(extractSeconds(1)).toBe(1);
    expect(extractSeconds(10.1234)).toBe(10);
    expect(extractSeconds(SECONDS_PER_MINUTE)).toBe(0);
    expect(extractSeconds(2 * SECONDS_PER_MINUTE)).toBe(0);
    expect(extractSeconds(2 * SECONDS_PER_HOUR)).toBe(0);
  });
});
