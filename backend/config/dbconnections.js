const mysql = require('mysql');
require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db

/* for the localhost implementation
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
})
*/