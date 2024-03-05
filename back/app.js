const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const user = require('./src/controller/user');
const todo = require('./src/controller/todo');

app.use(cors({
    origin: '*',
}));

app.post('/login', user.logIn);

app.get('/refresh', user.refresh);

app.post('/signup', user.signUp);



app.post('/mytodo', todo.listTodo);

app.post('/uploadtodo', todo.uploadTodo);

app.listen((port), () => {
    console.log(`server started at ${port}`);
});