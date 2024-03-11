const SERVER_URL = 'http://10.0.2.2/api';
import axios from "axios";
import { Alert } from 'react-native';


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