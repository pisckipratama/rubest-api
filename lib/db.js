const { Pool } = require('pg');

// inisiasi database
const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  password: process.env.POSTGRES_SECRET || "12345",
  database: process.env.POSTGRES_DB || "latihancrud",
  port: process.env.POSTGRES_PORT || 5432
});

module.exports = { pool };