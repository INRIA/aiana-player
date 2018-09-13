export function secondsToHMS(time: number, separator = ':'): string {
  const { floor } = Math;
  const hours = floor(time / 3600);
  const minutes = floor((time % 3600) / 60);
  const seconds = floor((time % 3600) % 60);

  const formattedHours = formatHours(hours);
  const displayMinutes = leadingZero(minutes);
  const displaySeconds = leadingZero(seconds);

  return `${
    formattedHours ? `${formattedHours}${separator}` : ''
  }${displayMinutes}${separator}${displaySeconds}`;
}

export function formatHours(hours: number): string | null {
  if (hours === 0) {
    return null;
  }

  return leadingZero(hours);
}

export function leadingZero(num: number): string {
  if (num < 0) {
    throw new Error(`Cannot format negative value (${num} given)`);
  } else if (num < 10) {
    return `0${num}`;
  }

  return `${num}`;
}
