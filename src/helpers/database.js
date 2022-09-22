const mariadb = require("mariadb");
// const {createPool} = require("mysql");
// const fs = require("fs");
const mysql = require("mysql");

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   connectionLimit: 5,
// });

// const pool = createPool({
//   host: "db-mariadb-user-do-user-12395460-0.b.db.ondigitalocean.com",
//   user:"doadmin",
//   password: "AVNS_448Cq_C1kg-ehy0d10q",
//   database: "defaultdb",
//   connectionLimit: 5,
//   port: 25060,
//   sslmode: "require",
// });

const db = mysql.createConnection({
  host: "db-mariadb-user-do-user-12395460-0.b.db.ondigitalocean.com",
  user:"developer",
  password: "Developer",
  database: "defaultdb",
  connectionLimit: 10,
  port: 25060,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

//Coneccion a la base de datos y chequeo de errores
// pool.getConnection((err, connection) => {
//     if(err){
//         if (err.code === 'PROTOCOL_CONNECTION_LOST'){
//             console.error('Database connection lost');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR'){
//             console.error('Database has too many connection');
//         }
//         if (err.code === 'ECONNREFUSED'){
//             console.error('Database connection was refused');
//         }
//     }
//     if(connection) connection.release();

//     return;
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL Server!");
// });

module.exports = mysql;