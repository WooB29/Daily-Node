import React, { useEffect, useState } from "react";
import { Container, ListContainer } from "../components/container";
import { TodoText } from "../components/text";
import Input from "../components/input";
import Button from '../components/button';
import {getTodo, uploadTodo, doneTodo, deleteTodo } from '../utils/todo';
import {DoneIcon, DeleteIcon} from '../components/icon';
import { FlatList } from "react-native";



const Todo = ({navigation}) => {
    const [text, setText] = useState('');
    const [todoList, setTodoList] = useState([]);

    const List = ({ id, text, done }) => (
        <ListContainer done={done}>
            <DoneIcon 
                done={done}
                onPress={() => _onPressDone(id, done)}
            />
            <TodoText done={done}>{text} - {done ? '완료' : '미완료'}</TodoText>
            <DeleteIcon 
                onPress={() => _onPressDelete(id)}
            />
        </ListContainer>
    );
    
    const _onPressDone = async (id, done) => {
        await doneTodo(id, done, navigation);
        fetchData();
    };
    
    const _onPressDelete = async (id) => {
        console.log('delete', id);
        await deleteTodo(id, navigation);
        fetchData();
    };

    const fetchData = async () => {
        const data = await getTodo(navigation);
        setTodoList(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const _onSubmitHandler = async (e) => {
        e.preventDefault();
        await uploadTodo(text, navigation);
        setText('');
        fetchData();
    };

    return(
        <Container>
            <Input 
                label='todo'
                value={text}
                onChangeText={text => setText(text)}
                onSubmitEditing={_onSubmitHandler}
            />
            <Button
                title='ADD'
                onPress={_onSubmitHandler}
            />
            <FlatList
                data={todoList}
                renderItem={({ item }) => <List {...item} />}
                keyExtractor={item => item.id.toString()}
            />
        </Container>
    );
}
export default Todo;