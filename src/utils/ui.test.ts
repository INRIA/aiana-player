import { bounded } from './ui';

const lowerBound = 0;
const upperBound = 10;

test('any numeric value is valid', () => {
  expect(bounded(2, lowerBound, upperBound)).toBe(2);
  expect(bounded(lowerBound, lowerBound, upperBound)).toBe(lowerBound);
  expect(bounded(upperBound, lowerBound, upperBound)).toBe(upperBound);
  expect(bounded(lowerBound - 1, lowerBound, upperBound)).toBe(lowerBound);
  expect(bounded(upperBound + 1, lowerBound, upperBound)).toBe(upperBound);
});
