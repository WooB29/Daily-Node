const express = require('express');
//const cors = require('cors');
//const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Pool } = require('pg');
const pgdb = new Pool({
    user: 'postgres',
    password: '1234',
    database: 'daily',
    host: 'postgres',
});

pgdb.on('connect', (client) => {
    client
    .query("CREATE TABLE IF NOT EXISTS todoList (id SERIAL PRIMARY KEY, text VARCHAR(255), done BOOLEAN)")
    .catch(err => console.log(err));
});

/*
mongoose.connect('mongodb://localhost:27017/daily', {useNewUrlParser: true}, (err) => {
    if(err){
        console.log(`Error on DB Connection:${err}`);
    }
    else{
        console.log("Connected to DB");
    }
});
*/
//app.use(cors());

// let id = 2;
// const todoList = [{
//     id: 1,
//     text: '할일 1',
//     done: false,
// }];

app.get('/todo', async (req, res) => {
    try {
        const todoList = await pgdb.query('SELECT * FROM todoList');
        res.json(todoList.rows);
    } 
    catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    //res.json(todoList);
});

app.post('/todo', async (req, res) => {
    try {
        const { text, done } = req.body;
        const query = {
            text: 'INSERT INTO todoList (text, done) VALUES($1, $2) RETURNING *',
            values: [text, done]
        };
        await pgdb.query(query);
        
        const resp = await pgdb.query('SELECT * FROM todoList');
        res.json(resp.rows);
    } 
    catch (error) {
        console.error('Error inserting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    // const { text, done } = req.body;
    // console.log('req.body : ', req.body);
    // todoList.push({
    //     id: ++id,
    //     text,
    //     done,
    // });
    // return res.send('Success!!');
});

app.listen((port), () => {
    console.log(`server started at ${port}`);
});