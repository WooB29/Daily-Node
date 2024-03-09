import React, {useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components/native";
import Input from '../components/input';
import Button from '../components/button';
import { Alert } from 'react-native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: '#FFF';
    padding : 40px 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: 'red';
`;

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
        if(didMountRef.current){
            let _errorMessage = '';
            if(!name){
                _errorMessage = 'Please enter your name.';
            } else if (!email) {
                _errorMessage = 'Please enter your eamil.';
            } else if (password.length < 4){
                _errorMessage = 'The password must contain 4 characters at least.';
            } else if (password !== passwordConfirm) {
                _errorMessage = 'Passwords need to match.';
            } else {
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
        }
    }, [name, email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email, password, passwordConfirm, errorMessage]);



    const _onPressSignup = () => {
        Alert.alert('Signup','press');
    }

    return(
        <Container>
            <Input 
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
                onSubmitEditing={() => {
                    setName(name.trim());
                    emailRef.current.focus();
                }}
                onBlur={() => setName(name.trim())}
                placeholder="Name"
                retrunKeyType="next"
            />
            <Input 
                ref={emailRef}
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={() => passwordRef.current.focus()}
                placeholder="Email"
                retrunKeyType="next"
            />
            <Input 
                ref={passwordRef}
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={() => passwordConfirmRef.current.focus()}
                placeholder="Password"
                retrunKeyType="done"
                isPassword
            />
            <Input 
                ref={passwordConfirmRef}
                label="Password Confirm"
                value={passwordConfirm}
                onChangeText={text => setPasswordConfirm(text)}
                onSubmitEditing={_onPressSignup}
                placeholder="Password"
                retrunKeyType="done"
                isPassword
            />
            <ErrorText>{errorMessage}</ErrorText>
            <Button
                title="Signup"
                onPress={_onPressSignup}
                disabled={disabled}
            />
        </Container>
    );
    
}

export default SignUp;