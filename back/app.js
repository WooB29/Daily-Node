const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
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
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const todoList = [{
    id: 1,
    text: '할일 1',
    done: false,
}];

app.get('/todo', (req, res) => {
    res.json(todoList);
});

app.post('/todo', (req, res) => {
    const { text, done } = req.body;
    console.log('req.body : ', req.body);
    todoList.push({
        id: ++id,
        text,
        done,
    });
    return res.send('Success!!');
});

app.listen((port), () => {
    console.log(`server started at ${port}`);
});