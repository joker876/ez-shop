const mysql = require('mysql');

const DB_CONFIG = {
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const db = mysql.createConnection(DB_CONFIG);
db.connect((err) => {
    if (err) throw err;
    console.info(`Database connected on port \x1b[32m\x1b[4m${DB_CONFIG.port}\x1b[0m!`);
});

module.exports = db;