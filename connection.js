var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    port: process.env.DB_PORT
});

module.exports = connection;