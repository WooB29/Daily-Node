const pgdb = require('../utils/postgres');


exports.listTodo = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const memberQuery = {
            text: 'SELECT * FROM member where email = $1',
            values: [userEmail]
        };
        const memberResult = await pgdb.query(memberQuery);
        if (memberResult.rows.length === 0){
            return res.status(401).json({message: '회원정보를 찾을 수 없습니다.'});
        }
        const member_id = memberResult.rows[0].id;
        const todoListQuery = {
            text: 'SELECT t.* FROM todoList t JOIN member_todo mt ON t.id = mt.todoList_id WHERE mt.member_id = $1',
            values: [member_id]
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
        const userEmail = req.body.email;
        const memberQuery = {
            text: 'SELECT * FROM member where email = $1',
            values: [userEmail]
        };
        const memberResult = await pgdb.query(memberQuery);
        if (memberResult.rows.length === 0){
            return res.status(401).json({message: '회원정보를 찾을 수 없습니다.'});
        }
        const member_id = memberResult.rows[0].id;

        const { text, done } = req.body;
        const todoQuery = {
            text: 'INSERT INTO todoList (text, done) VALUES($1, $2) RETURNING id',
            values: [text, done]
        };
        const todoResult = await pgdb.query(todoQuery);
        const todo_id = todoResult.rows[0].id;

        const memberTodoQuery = {
            text: 'INSERT INTO member_todo (todoList_id, member_id) VALUES($1, $2)',
            values: [todo_id, member_id]
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