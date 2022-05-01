require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const config = { host, user, password, database, connectionLimit: 50 };
exports.pool = mysql.createPool(config);
