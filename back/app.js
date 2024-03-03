const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pgdb = require('./src/db/postgres');
const Todo = require('./src/models/todo');




app.use(cors());

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const resp = await pgdb.query('SELECT * FROM member where email = $1 and password = $2',[email,password]);
        if (resp.rows.length > 0){
            res.json(200).json({ success : true});
        }
        else{
            res.status(409).json({error : '아이디 비밀번호가 일치하지 않습니다.'});
        }
    }
    catch(error){
        console.error('Error inserting member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const resp = await pgdb.query('SELECT * FROM member where email = $1',[email]);
        if (resp.rows.length > 0){
            res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
        }
        else{
            const query = {
                text: 'INSERT INTO member (email, password, name) VALUES($1, $2, $3) RETURNING *',
                values: [email, password, name]
            };
            await pgdb.query(query);
            res.status(200).json({ success : true});
        }
    } 
    catch (error) {
        console.error('Error inserting member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/connect', async (req, res) => {
    try{
        res.status(200).json({ success : true});
    }
    catch{
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/todo', async (req, res) => {
    try {
        const todoList = await Todo.find();
        res.status(200).json(todoList);
    } catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/todo', async (req, res) => {
    try {
        const { text, done } = req.body;
        
        const newTodo = new Todo({
            text: text,
            done: done
        });
        await newTodo.save();
        
        res.status(200).json(newTodo);
    } 
    catch (error) {
        console.error('Error inserting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/*
app.get('/todo', async (req, res) => {
    try {
        const todoList = await pgdb.query('SELECT * FROM todoList');
        res.status(200).json(todoList.rows);
    } 
    catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
});
*/
app.listen((port), () => {
    console.log(`server started at ${port}`);
});