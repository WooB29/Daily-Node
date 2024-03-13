import React, {useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from '../components/input';
import Button from '../components/button';
import {signup} from '../utils/user';
import { Container } from "../components/container";
import { ErrorText } from "../components/text";

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
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if(didMountRef.current){
            let _errorMessage = '';
            if(!name){
                _errorMessage = 'Please enter your name.';
            } else if (!email) {
                _errorMessage = 'Please enter your eamil.';
            } else if (!isEmailValid(email)) {
                _errorMessage = 'Please enter a valid email address.';
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
        signup(email, password, name, navigation);
    }

    return(
        <KeyboardAwareScrollView extraScrollHeight={20} style={{backgroundColor:'#fff'}}>
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
        </KeyboardAwareScrollView>
    );
    
}

export default SignUp;