import { bounded } from '../utils/ui';
import { uid } from '../utils/uniqueId';

describe('bounding values for ui purpose', () => {
  test('should work with any numeric value', () => {
    expect(bounded(4, 3, 10)).toBe(4);
    expect(bounded(3, 3, 10)).toBe(3);
    expect(bounded(10, 3, 10)).toBe(10);
    expect(bounded(2, 3, 10)).toBe(3);
    expect(bounded(11, 3, 10)).toBe(10);
    expect(bounded(-1, 1, 2)).toBe(1);
    expect(bounded(1, -1, 2)).toBe(1);
    expect(bounded(-10, -5, -1)).toBe(-5);
  });

  test('should throw an error when lower bound is not lower than greater bound', () => {
    expect(() => {
      bounded(1, 10, 1);
    }).toThrow();
  });
});

test('uid accepts all kind of numeric values', () => {
  expect(uid(1).length).toBe(1);
  expect(uid(3).length).toBe(3);
  expect(uid(4).length).toBe(4);
  expect(uid(11).length).toBe(11);
  expect(uid(11.3).length).toBe(11);
  expect(uid(0.5).length).toBe(0);
  expect(uid(-1).length).toBe(0);
});
