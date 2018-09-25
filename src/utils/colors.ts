import * as convert from 'color-convert';

/**
 *
 * @param color {string} Hexadecimal color (#aabbcc).
 * @param alpha {number} Alpha channel, between 0 and 1.
 */
export function hexToHsla(color: string, alpha: number): string {
  const [h, s, l] = convert.hex.hsl(color);
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}
