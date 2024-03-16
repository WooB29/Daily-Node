const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const user = require('./src/controller/user');
const todo = require('./src/controller/todo');
const list = require('./src/controller/list');

app.use(cors({
    origin: '*',
}));

app.post('/login', user.logIn);
app.get('/refresh', user.refresh);
app.post('/signup', user.signUp);

app.get('/getMyInfo', user.getMyInfo);

app.get('/test', (req, res) => {
    res.status(200).json({ message: "hi hello" });
});

app.post('/mytodo', todo.listTodo);
app.post('/uploadtodo', todo.uploadTodo);
app.patch('/todoDone/:id', todo.todoDone);
app.delete('/todoDelete', todo.todoDelete);

app.get('/myStudyList/:name', list.getLists);
app.get('/mySubjectList', list.mySubjectList);
app.post('/uploadList', list.uploadList);
app.delete('/deleteList/:id/:name', list.deleteList);

app.listen((port), () => {
    console.log(`server started at ${port}`);
});