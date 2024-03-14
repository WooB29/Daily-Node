import { SERVER_URL } from '@env';
import axios from "axios";
import { Alert } from 'react-native';
import { getTokenFromLocal } from './token';

const getToken = async (navigation) => {
    const Token = await getTokenFromLocal();
    if (!Token) {
        navigation.navigate('SignInPage');
        return false;
    }
    return Token;
}

export const signup = async (email, password, name, navigation) => {
    try{
        const response = await axios.post(`${SERVER_URL}/signup`,{
            email: email,
            password: password,
            name: name
        });

        if(response.status === 200){
            Alert.alert('Success','회원가입 성공');
            navigation.navigate('SignInPage');
        }
    }
    catch(error){
        console.log(error.response);
        Alert.alert('Error',error.response.data.error);
    }
}

export const getMyInfo = async (navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await axios.get(`${SERVER_URL}/getMyInfo`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            }
        });

        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        return response.data;
    }
    catch(err){
        console.error('get-err : '+err);
    }
};