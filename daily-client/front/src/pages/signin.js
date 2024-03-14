import React, { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from '../components/input';
import Button from '../components/button';
import { getTokens } from "../utils/token";
import { Container } from '../components/container';


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
        getTokens(email, password, navigation);
    };

    const _onPressSignUp = () => {
        navigation.navigate('SignUpPage');
    };

    return(
        <KeyboardAwareScrollView 
            contentContainerStyle={{ flex: 1}}
            extraScrollHeight={20}
        >
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
                    isFilled={false}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
}

export default SignIn;