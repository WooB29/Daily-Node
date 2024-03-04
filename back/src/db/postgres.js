const { Pool } = require('pg');
const pgdb = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
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

pgdb.on('error', () =>{
    console.log('disconnect from database');
});


module.exports = pgdb;