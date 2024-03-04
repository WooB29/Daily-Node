const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pgdb = require('./src/db/postgres');
//const mgdb = require('./src/db/mongo');
//const Todo = require('./src/models/todo');

app.use(cors({
    origin: '*',
}));

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const resp = await pgdb.query('SELECT * FROM member where email = $1 and password = $2',[email,password]);
        if (resp.rows.length > 0){
            return res.status(200).json({ success : true});
        }
        else{
            return res.status(409).json({error : '아이디 비밀번호가 일치하지 않습니다.'});
        }
    }
    catch(error){
        console.error('Error inserting member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const resp = await pgdb.query('SELECT * FROM member where email = $1',[email]);
        if (resp.rows.length > 0){
            return res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
        }
        else{
            const query = {
                text: 'INSERT INTO member (email, password, name) VALUES($1, $2, $3) RETURNING *',
                values: [email, password, name]
            };
            await pgdb.query(query);
            return res.status(200).json({ success : true});
        }
    } 
    catch (error) {
        console.error('Error inserting member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/connect', async (req, res) => {
    try{
        return res.status(200).json({ success : true});
    }
    catch{
        return res.status(500).json({ error: 'Internal server error' });
    }
});
/*
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
*/
app.get('/test', async (req, res) => {
    try{
        const test = await pgdb.query('SELECT * FROM member');
        return res.status(200).json(test.rows);
    }
    catch(e){
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/todo', async (req, res) => {
    try {
        const todoList = await pgdb.query('SELECT * FROM todoList');
        return res.status(200).json(todoList.rows);
    } 
    catch (error) {
        console.error('Error fetching todo list:', error);
        return res.status(500).json({ error: 'Internal server error' });
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
        return res.json(resp.rows);
    } 
    catch (error) {
        console.error('Error inserting todo:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen((port), () => {
    console.log(`server started at ${port}`);
});