// import pg from 'pg';
const pg  =require('pg');
const { Pool } = pg;

let localPoolConfig = {
  user: 'postgres',
  password: 'awais243',
  host: 'localhost',
  port: '5432',
  database: 'newrana'
};

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} : localPoolConfig;

const pool = new Pool(poolConfig);
// export default pool;
module.exports = pool;