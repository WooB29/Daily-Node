const SERVER_URL = 'http://10.0.2.2/api';
import axios from "axios";
import { getTokenFromLocal } from './token';

const getToken = async (navigation) => {
    const Token = await getTokenFromLocal();
    if (!Token) {
        navigation.navigate('SignInPage');
        return false;
    }
    return Token;
}

export const getStudyList = async (navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await axios.get(`${SERVER_URL}/myStudyList`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            }
        });

        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        console.log('response.data : '+response.data);
        return response.data;
        
    }
    catch(err){
        console.error('get-err : '+err);
    }
};

export const getSubjectList = async (navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await axios.get(`${SERVER_URL}/mySubjectList`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            }
        });

        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        console.log('response.data : '+response.data);
        return response.data;
    }
    catch(err){
        console.error('get-err : '+err);
    }
};