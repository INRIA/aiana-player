import { range } from '../utils/range';

describe('range with single parameter', () => {
  test('length is valid', () => {
    expect(range(5)).toHaveLength(5);
  });
  test('starts at 0', () => {
    expect(range(5)[0]).toBe(0);
  });
});

describe('range with multiple parameters', () => {
  test('length is valid', () => {
    expect(range(5, 1)).toHaveLength(5);
  });
  test('accept start parameter', () => {
    expect(range(5, 1)[0]).toBe(1);
  });
});
