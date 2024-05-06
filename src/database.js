const { Pool } = require('pg')
require('dotenv').config();


const pool = new Pool({
  max: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.DBPORT,
});


// Get a connection from the pool
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.connect().then((client) => {
      console.log("Connected to database.");
      resolve(client);
    }).catch((reason) => {
      console.error("Failed to connect database:", reason);
      reject(reason);
    });
  });
};

module.exports = getConnection;