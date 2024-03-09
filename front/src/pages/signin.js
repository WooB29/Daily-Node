import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Input from '../components/input';
import Button from '../components/button';
import { Alert } from 'react-native';
import { getTokens } from "../utils/token";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items : center;
    background-color: "#FFF";
    padding: 20px;
`;

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const insets = useSafeAreaInsets();

    const _handleEmailChange = email => {
        setEmail(email);
    };

    const _handlePasswordChange = password => {
        setPassword(password);
    };

    const _onPressLogin = () => {
        Alert.alert('Login','press');
    };

    const _onPressSignUp = () => {
        navigation.navigate('SignUpPage');
    };

    return(
        <Container insets={insets}>
            <Input 
                label="Email"
                value={ email }
                onChangeText={_handleEmailChange}
                onSubmitEditing = {() => passwordRef.current.focus()}
                placeholder="Email"
                retrunKeyType="next"
            />
            <Input 
                ref={passwordRef}
                label="password"
                value={ password }
                onChangeText = {_handlePasswordChange}
                onSubmitEditing = {_onPressLogin}
                placeholder="Password"
                retrunKeyType="done"
                isPassword
            />
            <Button 
                title="Login" 
                onPress={_onPressLogin}
            />
            <Button
                title="Signup"
                onPress={_onPressSignUp}
            />
        </Container>
    );
}

export default SignIn;