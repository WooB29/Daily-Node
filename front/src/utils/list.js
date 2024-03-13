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

export const getStudyList = async (name, navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }
        
        const response = await axios.get(`${SERVER_URL}/myStudyList/${name}`, {
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
        return response.data;
    }
    catch(err){
        console.error('get-err : '+err);
    }
};

export const uploadList = async (subjectData, title, content, navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await axios.post(`${SERVER_URL}/uploadList`, {
                subject: subjectData,
                title: title,
                content: content
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token.accessToken}`,
                }
            }
        );
        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        navigation.goBack();
    }
    catch(err){
        console.error('add-err : '+err);
    }
};

export const deleteList = async (id, name, navigation) => {
    console.log('press delete : '+id);
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await axios.delete(`${SERVER_URL}/deleteList/${id}/${name}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            }
        });

        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        console.log('response : '+response.data.success);
    }
    catch(err){
        console.error('delete-err : '+err);
    }
}