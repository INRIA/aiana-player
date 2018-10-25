import {
  I18N_DURATION_HOURS_KEY,
  I18N_DURATION_HOURS_MINUTES_KEY,
  I18N_DURATION_HOURS_MINUTES_SECONDS_KEY,
  I18N_DURATION_HOURS_SECONDS_KEY,
  I18N_DURATION_MINUTES_KEY,
  I18N_DURATION_MINUTES_SECONDS_KEY,
  I18N_DURATION_SECONDS_KEY,
  MINUTES_PER_HOUR,
  SECONDS_PER_HOUR
} from 'src/constants';

interface ITimeObject {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export function durationTranslationKey(time: number): string {
  const { hours, minutes, seconds } = secondsToHMSObject(time);

  if (hours && minutes && seconds) {
    return I18N_DURATION_HOURS_MINUTES_SECONDS_KEY;
  } else if (hours && minutes) {
    return I18N_DURATION_HOURS_MINUTES_KEY;
  } else if (hours && seconds) {
    return I18N_DURATION_HOURS_SECONDS_KEY;
  } else if (hours) {
    return I18N_DURATION_HOURS_KEY;
  } else if (minutes && seconds) {
    return I18N_DURATION_MINUTES_SECONDS_KEY;
  } else if (minutes) {
    return I18N_DURATION_MINUTES_KEY;
  } else {
    return I18N_DURATION_SECONDS_KEY;
  }
}

export function secondsToHMSObject(time: number): ITimeObject {
  return {
    hours: extractHours(time),
    minutes: extractMinutes(time),
    seconds: extractSeconds(time)
  };
}

export function extractHours(time: number): number {
  return Math.floor(time / SECONDS_PER_HOUR);
}

export function extractMinutes(time: number): number {
  return Math.floor((time % SECONDS_PER_HOUR) / MINUTES_PER_HOUR);
}

export function extractSeconds(time: number): number {
  return Math.floor((time % SECONDS_PER_HOUR) % MINUTES_PER_HOUR);
}

export function secondsToHMS(time: number, separator = ':'): string {
  const { hours, minutes, seconds } = secondsToHMSObject(time);

  const formattedHours = formatHours(hours);
  const displayMinutes = formatMinutes(minutes, hours);
  const displaySeconds = leadingZero(seconds);

  return `${
    formattedHours ? `${formattedHours}${separator}` : ''
  }${displayMinutes}${separator}${displaySeconds}`;
}

export function formatHours(hours: number): string | null {
  if (hours < 0) {
    throw new Error('Non negative value expected.');
  }

  if (hours === 0) {
    return null;
  }

  return `${hours}`;
}

export function formatMinutes(minutes: number, hours: number) {
  if (hours > 0) {
    return leadingZero(minutes);
  }

  return `${minutes}`;
}

export function leadingZero(num: number): string {
  const flooredNum = Math.floor(num);
  if (flooredNum < 0) {
    throw new Error('Non negative value expected.');
  } else if (flooredNum < 10) {
    return `0${flooredNum}`;
  }

  return `${flooredNum}`;
}
