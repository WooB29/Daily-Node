import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const SERVER_URL = 'http://10.0.2.2/api';
//const SERVER_URL = process.env.REACT_APP_SERVER_URL;
import { Alert } from 'react-native';

export const getTokens = async (email, password, navigation) => {
  try{
    const response = await axios.post(`${SERVER_URL}/login`, {
      email: email,
      password: password
    });

    if (response.status === 200){
      AsyncStorage.setItem('Tokens', JSON.stringify({
        'accessToken': response.data.accessToken,
        'refreshToken': response.data.refreshToken,
        'userId': response.data.email,
      }))
      navigation.navigate('MainStack');
    }
  } 
  catch (error) {
    console.error('오류 발생 : ', error);
    if(error.response.status === 401){
      Alert.alert('Error',error.response.data.message);
    }
    else{
      Alert.alert('Error','알수없는 오류 발생');
    }
  }

};

export const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("Tokens");
    if (value !== null) {
      return JSON.parse(value)
    }
    else{
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};


export const verifyTokens = async (navigation) => {
  const Token = await getTokenFromLocal();

  if (Token === null){
    navigation.reset({routes: [{name: "SignInPage"}]});
  }
  else{
    const headers_config = {
      "refresh": Token.refreshToken,
      Authorization: `Bearer ${Token.accessToken}`   
    };

    try {
      const res = await axios.get(`${SERVER_URL}/refresh`, {headers: headers_config});
      AsyncStorage.setItem('Tokens', JSON.stringify({
        ...Token,
        'accessToken': res.data.accessToken,
      }))
      navigation.reset({routes: [{name: "MainStack"}]});

    } catch(error){
      const code = error.response.data.code;

      if(code === 401){
        navigation.reset({routes: [{name: "SignInPage"}]});
      }
      else{
        navigation.reset({routes: [{name: "SignInPage"}]});
      }
    }
  }
};