const { Pool } = require('pg');
const pgdb = new Pool({
    user: 'postgres',
    password: '1234',
    database: 'daily',
    host: 'postgres',
});

pgdb.on('connect', (client) => {
    client
    .query("CREATE TABLE IF NOT EXISTS member (id SERIAL PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), name VARCHAR(255))")
    .catch(err => console.log(err));

    client
    .query("CREATE TABLE IF NOT EXISTS todoList (id SERIAL PRIMARY KEY, text VARCHAR(255), done BOOLEAN)")
    .catch(err => console.log(err));
});


module.exports = pgdb;