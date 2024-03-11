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
            email VARCHAR(255) PRIMARY KEY,
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
            member_email VARCHAR(255),
            FOREIGN KEY (todoList_id) REFERENCES todoList(id),
            FOREIGN KEY (member_email) REFERENCES member(email)
        )
    `).catch(err => console.error('Error creating member_todoList table:', err));

    client.query(`
        CREATE TABLE IF NOT EXISTS token(
            email varchar(255) PRIMARY KEY,
            token varchar(5000) not null
        )
    `).catch(err => console.error('Error creating token table:', err));

    client.query(`
        CREATE TABLE IF NOT EXISTS MEMBER_SUBJECT (
            id SERIAL PRIMARY KEY,
            member_email VARCHAR(255),
            subject VARCHAR(255),
            FOREIGN KEY (member_email) REFERENCES member(email)
        )
    `).catch(err => console.error('Error creating member_subject table:'+err));

    client.query(`
        CREATE TABLE IF NOT EXISTS SUBJECT_STUDYLIST(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            content VARCHAR(255),
            subject_id intiger,
            FOREIGN KEY (subject_id) REFERENCES subject(id)
        )
    `).catch(err => console.error('Error creating subject_studylist table:'+err));

    client.query(`
        CREATE TABLE IF NOT EXISTS MEMBER_STUDYLIST(
            id SERIAL PRIMARY KEY,
            
        )
    `).catch(err => console.error('Error creating member_studylist table:'+err));
});

pool.on('error', () =>{
    console.log('disconnect from database');
});


module.exports = pool;