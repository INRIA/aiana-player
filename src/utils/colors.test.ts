import { hexToHsla } from './colors';

test('with valid hex colors', () => {
  expect(hexToHsla('#000000', 0)).toBe('hsla(0, 0%, 0%, 0)');
  expect(hexToHsla('#000', 0)).toBe('hsla(0, 0%, 0%, 0)');
  expect(hexToHsla('#000', 0.5)).toBe('hsla(0, 0%, 0%, 0.5)');
  expect(hexToHsla('#000', 1)).toBe('hsla(0, 0%, 0%, 1)');
  expect(hexToHsla('#fff', 0)).toBe('hsla(0, 0%, 100%, 0)');
  expect(hexToHsla('#f00', 0)).toBe('hsla(0, 100%, 50%, 0)');
  expect(hexToHsla('#0ff', 0)).toBe('hsla(180, 100%, 50%, 0)');
});

test('invalid hex colors are handled and return black', () => {
  expect(hexToHsla('fake color', 1)).toBe('hsla(0, 0%, 0%, 1)');
  expect(hexToHsla('#1', 1)).toBe('hsla(0, 0%, 0%, 1)');
});
