const { luhnCheck } = require('../index');

describe('luhnCheck', () => {
  test('devuelve true para número válido', () => {
    expect(luhnCheck('4539578763621486')).toBe(true);
  });

  test('devuelve false para número inválido', () => {
    expect(luhnCheck('1234567890123456')).toBe(false);
  });
});
