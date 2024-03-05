const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
    host: 'postgres',
});

pool.on('connect', (client) => {
    client.query(`
        CREATE TABLE IF NOT EXISTS member (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) not null,
            name VARCHAR(255) not null,
            authtoken VARCHAR(5000) null
        )
    `).catch(err => console.error('Error creating member table:', err));

    client.query(`
        CREATE TABLE IF NOT EXISTS todoList (
            id SERIAL PRIMARY KEY,
            text VARCHAR(255) not null,
            done BOOLEAN NOT NULL
        )
    `).catch(err => console.error('Error creating todoList table:', err));

    client.query(`
        CREATE TABLE IF NOT EXISTS member_todoList (
            id SERIAL PRIMARY KEY,
            todoList_id INTEGER,
            member_id INTEGER,
            FOREIGN KEY (todoList_id) REFERENCES todoList(id),
            FOREIGN KEY (member_id) REFERENCES member(id)
        )
    `).catch(err => console.error('Error creating member_todoList table:', err));

    client.query(`
        CREATE TABLE IF NOT EXISTS token(
            email varchar(255) PRIMARY KEY,
            token varchar(5000) not null
        )
    `).catch(err => console.error('Error creating token table:', err));
});

pool.on('error', () =>{
    console.log('disconnect from database');
});


module.exports = pool;