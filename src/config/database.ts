import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const createDbConnection = async () => {
  console.log(
    '🚀 ~ createDbConnection ~ process.env.DB_NAME:',
    process.env.DB_NAME
  );
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'my_password',
    database: process.env.DB_NAME || 'my_database',
    port: Number(process.env.DB_PORT) || 3306,
  });
};
