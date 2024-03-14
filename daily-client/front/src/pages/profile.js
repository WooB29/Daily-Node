import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "../components/container";
import Button from "../components/button";
import Input from "../components/input";
import { getMyInfo } from "../utils/user";


const Profile = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const _onPressLogOut = async () => {
        try{
            await AsyncStorage.removeItem('Tokens');
            navigation.navigate('SignInPage');
        }
        catch(e){
            console.log('log out error: ' + e);
        }
    }

    const _getMyInfo = async () => {
        const data = await getMyInfo();
        setEmail(data.email);
        setName(data.name);
    }

    useEffect(() => {
        _getMyInfo();
    }, []);

    return(
        <Container>
            <Input 
                label='이메일'
                value={email}
                disabled={true}
            />
            <Input
                label='이름'
                value={name}
                disabled={true}
            />
            <Button 
                title='로그아웃'
                onPress={_onPressLogOut}
                isFilled={true}
                disabled={false}
            />
        </Container>
    );
}
export default Profile;