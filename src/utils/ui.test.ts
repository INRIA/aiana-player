import { bounded, uuid } from './ui';

test('any numeric value is valid', () => {
  const lowerBound = 0;
  const upperBound = 10;

  expect(bounded(2, lowerBound, upperBound)).toBe(2);
  expect(bounded(lowerBound, lowerBound, upperBound)).toBe(lowerBound);
  expect(bounded(upperBound, lowerBound, upperBound)).toBe(upperBound);
  expect(bounded(lowerBound - 1, lowerBound, upperBound)).toBe(lowerBound);
  expect(bounded(upperBound + 1, lowerBound, upperBound)).toBe(upperBound);
});

test('uuid accepts all kind of numeric values', () => {
  expect(uuid(1).length).toBe(1);
  expect(uuid(3).length).toBe(3);
  expect(uuid(4).length).toBe(4);
  expect(uuid(11).length).toBe(11);
  expect(uuid(11.3).length).toBe(11);
  expect(uuid(0.5).length).toBe(0);
  expect(uuid(-1).length).toBe(0);
});
