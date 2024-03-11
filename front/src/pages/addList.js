import React, {useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";
import Input from '../components/input';
import Button from '../components/button';
import { Container } from "../components/container";
import { TextInput } from "react-native";
import { getSubjectList } from "../utils/list";
import { ErrorText } from '../components/text';

const AddList = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [dropItem, setDropItem] = useState([]);
    const [newSubject, setNewSubject] = useState('');

    const titleRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
        if(didMountRef.current){
            if(!title){
                setErrorMessage('Please enter your title.');
            }
        } else {
            didMountRef.current = true;
        }
    }, [title, errorMessage]);

    useEffect(() => {
        setDisabled(
            !(title && !errorMessage)
        );
    }, [title, errorMessage]);

    useEffect( () => {
        const getData = async () => {
            try{
                const data = await getSubjectList(navigation);
                const newDropItem = data.map(subject => ({
                    label: subject.subject_name,
                    value: subject.id.toString(),
                }));
                newDropItem.push({ label: 'self', value: 'self' });
                setDropItem(newDropItem);
                console.log('newDropItem : '+newDropItem);
                console.log('value : '+dropItem.toString());
                console.log('value1 : '+dropItem[0]);
            }
            catch(err){
                console.log(err);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        setValue(dropItem[0]?.value);
    }, [dropItem]);



    const _onPressAddList = () => {
        console.log('onpress add list');
    }
    const _onChangeValue = (value) => {
        console.log('value : '+value);
    };

    return(
        <Container>
            <DropDownPicker
                items={dropItem} 
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                onChangeValue={_onChangeValue}
            />
            <TextInput 
                editable={dropItem.value === self ? false : true}
                value={newSubject}
                onChange={text => setNewSubject(text)}
                style={{
                    marginTop: 5,
                    padding: 10, 
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    width: '100%',
                    borderRadius: 7,
                }}
            />
            <Input 
                label="Title"
                value={title}
                onChangeText={text => setTitle(text)}
                onSubmitEditing={() => {
                    setTitle(title.trim());
                    titleRef.current.focus();
                }}
                onBlur={() => setTitle(title.trim())}
                placeholder="Title"
                retrunKeyType="next"
            />
            <TextInput
                editable
                multiline
                numberOfLines={7}
                maxLength={255}
                value={content}
                onChangeText={text => setContent(text)}
                style={{
                    padding: 10, 
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    width: '100%',
                    borderRadius: 7,
                }}
            />
            <ErrorText>{errorMessage}</ErrorText>
            <Button
                title="Add List"
                onPress={_onPressAddList}
                disabled={disabled}
            />
        </Container>
    );
    
}

export default AddList;