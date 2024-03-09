import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const SERVER_URL = 'http://10.0.2.2';
import { Alert } from 'react-native';

export const getTokens = (email, password, navigation) => {
    axios.post(`${SERVER_URL}/login`,
    {
      "userId":email,
      "userpw":password
    })
    .then(res =>{{
          if (res.status === 200){
            AsyncStorage.setItem('Tokens', JSON.stringify({
              'accessToken': res.data.accessToken,
              'refreshToken': res.data.refreshToken,
              'userId': res.data.userId
            }))
            navigation.navigate('HomePage');
          }

    }})
    .catch(error =>{
            if(error.response.status === 401){
                Alert.alert('Error',error.response.data);
            }
            else{
                Alert.alert('Error','알수없는 오류 발생');
            } 
          
    })
};

const getTokenFromLocal = async () => {
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
      const res = await axios.get(`${SERVER_URL}/refresh`, {headers: headers_config})

      AsyncStorage.setItem('Tokens', JSON.stringify({
        ...Token,
        'accessToken': res.data.data.accessToken,
      }))
      navigation.reset({routes: [{name: "HomePage"}]});

    } catch(error){
      const code = error.response.data.code; 

      if(code === 401){
        navigation.reset({routes: [{name: "SignInPage"}]});
      }
      else{
        navigation.reset({routes: [{name: "HomePage"}]});
      }
    }

  }
};