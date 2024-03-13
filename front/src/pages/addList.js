import React, {useState, useRef, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Input from '../components/input';
import Button from '../components/button';
import { Container } from "../components/container";
import { TextInput } from "react-native";
import { getSubjectList, uploadList } from "../utils/list";
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
    const newSubjectRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
        if(didMountRef.current){
            let _errorMessage = '';
            if(value !== 'self' ? false : !newSubject ? true : false){
                _errorMessage = 'Please enter subject name.';
            }
            else if(!title){
                _errorMessage = 'Please enter title.';
            }
            else{
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
        }
    }, [newSubject, title, errorMessage]);

    useEffect(() => {
        let valueCheck = value !== 'self' ? true : !newSubject ? false : true;
        setDisabled(
            !(valueCheck && title && !errorMessage)
        );
    }, [newSubject, title, errorMessage]);

    useEffect( () => {
        const getData = async () => {
            try{
                const data = await getSubjectList(navigation);
                const newDropItem = data.map(subject => ({
                    label: subject.name,
                    value: subject.name,
                }));
                newDropItem.push({ label: 'self', value: 'self' });
                setDropItem(newDropItem);
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
        let subjectData = newSubject;
        if(subjectData === ''){
            subjectData = value;
        }
        uploadList(subjectData, title, content, navigation);
    }

    const _onChangeValue = () => {
        setNewSubject('');
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
                editable={value === 'self' ? true : false}
                value={newSubject}
                onChangeText={text => setNewSubject(text)}
                style={{
                    marginTop: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: value === 'self' ? 'white' : '#AEAAAA',
                    width: '100%',
                    borderRadius: 7,
                }}
                onSubmitEditing={() => {
                    setNewSubject(newSubject);
                    newSubjectRef.current.focus();
                }}
                onBlur={() => setNewSubject(newSubject)}
                retrunKeyType="next"
            />
            <Input
                ref={newSubjectRef} 
                label="Title"
                value={title}
                onChangeText={text => setTitle(text)}
                onSubmitEditing={() => {
                    setTitle(title);
                    titleRef.current.focus();
                }}
                onBlur={() => setTitle(title)}
                placeholder="Title"
                retrunKeyType="next"
            />
            <TextInput
                ref={titleRef}
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