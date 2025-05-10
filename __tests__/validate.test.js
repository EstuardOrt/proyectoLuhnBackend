const request = require('supertest');
const { app } = require('../index');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('POST /validate', () => {
  test('devuelve 400 si input inválido', async () => {
    const res = await request(app).post('/validate').send({ number: 'abc' });
    expect(res.statusCode).toBe(400);
    expect(res.body.valid).toBe(false);
  });

  test('devuelve 200 si número válido', async () => {
    const res = await request(app).post('/validate').send({ number: '4539578763621486' });
    expect(res.statusCode).toBe(200);
    expect(res.body.valid).toBe(true);
  });
});
