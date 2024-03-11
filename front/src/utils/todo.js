const SERVER_URL = 'http://10.0.2.2/api';
import { getTokenFromLocal } from './token';

const getToken = async (navigation) => {
    const Token = await getTokenFromLocal();
    if (!Token) {
        navigation.navigate('SignInPage');
        return false;
    }
    return Token;
}

export const getTodo = async (navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }

        const response = await fetch(`${SERVER_URL}/mytodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            }
        });
        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        const data = await response.json();
        return data;
        
    }
    catch(err){
        console.error('get-err : '+err);
    }
};

export const uploadTodo = async (text, navigation) => {
    try{
        const Token = await getTokenFromLocal();
        if(!Token){
            navigation.navigate('SignInPage');
            return;
        }
        const response = await fetch(`${SERVER_URL}/uploadtodo`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            },
            body: JSON.stringify({
                text: text,
                done: false,
            })
        });
        console.log('response : '+response.data);
        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
    }
    catch(err){
        console.error('upload-err : '+err);
    }
}

export const doneTodo = async (id, done, navigation) => {
    let doneChange = done ? false : true;
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }
        const response = await fetch(`${SERVER_URL}/todoDone/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            },
            body: JSON.stringify({
                done: doneChange,
            })
        });
        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        await response.json();
    }
    catch(err){
        console.error('done-err : '+err);
    }
};

export const deleteTodo = async (id, navigation) => {
    try{
        const Token = await getToken(navigation);
        if (!Token) {
            return;
        }
        const response = await fetch(`${SERVER_URL}/todoDelete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.accessToken}`,
            },
            body: JSON.stringify({
                id: id,
            })
        });
        
        if(response.status === 401){
            navigation.navigate('SignInPage');
            return;
        }
        await response.json();
    }
    catch(err){
        console.error('done-err : '+err);
    }
};