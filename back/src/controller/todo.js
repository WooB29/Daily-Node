const pgdb = require('../utils/postgres');
const jwt = require('jsonwebtoken');

exports.userEmail = (req) => {
    const accessToken = req.headers["authorization"].split(" ")[1];
    if(!accessToken){
        return null;
    }
    const decoded = jwt.decode(accessToken);
    return decoded.id;
};

exports.listTodo = async (req, res) => {
    try {
        const accessToken = req.headers["authorization"].split(" ")[1];
        if(!accessToken){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }
        const decoded = jwt.decode(accessToken);
        const userEmail = decoded.id;
        if(!userEmail){
            return res.status(401).json({message: 'Access token is needed for refresh' });
        }
        const memberQuery = {
            text: 'SELECT * FROM member where email = $1',
            values: [userEmail]
        };
        const memberResult = await pgdb.query(memberQuery);
        if (memberResult.rows.length === 0){
            return res.status(401).json({message: '회원정보를 찾을 수 없습니다.'});
        }
        const member_email = memberResult.rows[0].email;
        const todoListQuery = {
            text: 'SELECT t.* FROM todoList t JOIN member_todolist mt ON t.id = mt.todoList_id WHERE mt.member_email = $1',
            values: [member_email]
        }
        const todoListResult = await pgdb.query(todoListQuery);
        return res.status(200).json(todoListResult.rows);
    } 
    catch (error) {
        console.error('Error fetching todo list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.uploadTodo = async (req, res) => {
    try {
        const accessToken = req.headers["authorization"].split(" ")[1];
        if(!accessToken){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }
        const decoded = jwt.decode(accessToken);
        const userEmail = decoded.id;
        const memberQuery = {
            text: 'SELECT * FROM member where email = $1',
            values: [userEmail]
        };
        const memberResult = await pgdb.query(memberQuery);
        if (memberResult.rows.length === 0){
            return res.status(401).json({message: '회원정보를 찾을 수 없습니다.'});
        }
        const member_email = memberResult.rows[0].email;

        const { text, done } = req.body;
        const todoQuery = {
            text: 'INSERT INTO todoList (text, done) VALUES($1, $2) RETURNING id',
            values: [text, done]
        };
        const todoResult = await pgdb.query(todoQuery);
        const todo_id = todoResult.rows[0].id;

        const memberTodoQuery = {
            text: 'INSERT INTO member_todolist (todoList_id, member_email) VALUES($1, $2)',
            values: [todo_id, member_email]
        };
        await pgdb.query(memberTodoQuery);
        
        const resp = await pgdb.query('SELECT * FROM todoList WHERE id = $1', [todo_id]);
        return res.status(200).json(resp.rows);
    } 
    catch (error) {
        console.error('Error inserting todo:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.todoDone = async (req, res) => {
    try{
        const id = req.params.id;
        const {done} = req.body;
        await pgdb.query('UPDATE todoList SET done = $1 WHERE id = $2', [done, id]);
        return res.status(200).json({message : 'todo update'});
    }
    catch(e){
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.todoDelete = async (req, res) => {
    try{
        const { id } = req.body;
        const accessToken = req.headers["authorization"].split(" ")[1];
        if(!accessToken){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }
        const decoded = jwt.decode(accessToken);
        const userEmail = decoded.id;
        await pgdb.query('DELETE FROM member_todolist WHERE member_email = $1 AND todoList_id = $2', [userEmail, id]);
        await pgdb.query('DELETE FROM todoList WHERE id = $1', [id]);
        return res.status(200).json({message: 'todo deleted'});
    }
    catch(e){
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

/* 몽고db 방식
exports.listTodo = async (req, res) => {
    try {
        const todoList = await Todo.find();
        res.status(200).json(todoList);
    } catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.uploadTodo = async (req, res) => {
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
};
*/