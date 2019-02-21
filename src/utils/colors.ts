import { hex } from 'color-convert';

/**
 * Converts a color from hexadecimal format to hue-saturation-light and adds an
 * alpha channel.
 *
 * @param color - Hexadecimal color (#aabbcc format).
 * @param alpha - Alpha channel, between 0 and 1.
 * @returns The hsla CSS value
 */
export function hexToHsla(color: string, alpha: number): string {
  const [h, s, l] = hex.hsl(color);
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}
