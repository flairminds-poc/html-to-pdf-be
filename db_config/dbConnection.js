const {DB_CONFIG} = require('../config/index.js');
let dbCon = false
try {
  const mysql = require("mysql2");
  const con = mysql.createConnection({
    connectionLimit: 10,
    host: DB_CONFIG.HOST,
    user: DB_CONFIG.USER ,
    password: DB_CONFIG.PASSWORD,
    database: DB_CONFIG.DATABASE,
    port: DB_CONFIG.DATABASE_PORT,
    multipleStatements: true
  });
 
  con.connect((err) => {
    if (err) {
      return;
    } 
    console.info('Connected to MySQL');
  });
  dbCon = con;
} catch (error) {
}
module.exports = dbCon;