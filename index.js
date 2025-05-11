const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
//comentario
function luhnCheck(number) {
  const digits = number.split('').reverse().map(Number);
  const total = digits.reduce((sum, digit, i) => {
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return sum + digit;
  }, 0);
  return total % 10 === 0;
}

app.post('/validate', async (req, res) => {
  const { number } = req.body;
  if (!number || !/^[0-9]+$/.test(number)) {
    return res.status(400).json({ valid: false, error: 'Invalid input' });
  }

  const valid = luhnCheck(number);
  if (valid) {
    try {
      await pool.query('INSERT INTO validated_numbers (number) VALUES ($1);', [number]);
    } catch (err) {
      return res.status(500).json({ valid: true, error: err.message });
    }
  }

  res.json({ valid });
});

// Solo inicia el servidor si el archivo se ejecuta directamente (no cuando se importa en tests)
if (require.main === module) {
  app.listen(5000, () => {
    console.log('Backend running on port 5000');
  });
}

module.exports = { app, luhnCheck };
//comentario nuevo