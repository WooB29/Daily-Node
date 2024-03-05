import axios from 'axios';
const SERVER_URL = "/api";
let isNavigating = false;

export const getTokens = async (email, password) => {
    try{
        const response = await axios.post(`${SERVER_URL}/login`, {
          email: email,
          password: password
        });
  
        if (response.status === 200){
          localStorage.setItem('Tokens', JSON.stringify({
            'accessToken': response.data.accessToken,
            'refreshToken': response.data.refreshToken,
            'userId': response.data.userId,
          }))
          return null;
          // navigate('/home');
        }
  
      } catch (error) {
        console.error('오류 발생 : ', error);
        if(error.response.status === 401){
          return error.response.data.message;
        }
        else{
          return '알수없는 오류 발생';
        }
      }
};

export const getTokenFromLocal = () => {
    try{
        const value =  localStorage.getItem("Tokens");
        if(value !== null){
            return JSON.parse(value);
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e);
    }
};

export const verifyTokens = async (navigate) => {

    if(isNavigating){
        return;
    }
    isNavigating = true;

    const Token = await getTokenFromLocal();

    if (Token === null){
        navigate("/login");
    }
    else{
        const headers_config = {
            "refresh": Token.refreshToken,
            Authorization: `Bearer ${Token.accessToken}`
        };

        try{
            const res = await axios.get(`${SERVER_URL}/refresh`, {headers: headers_config});

            localStorage.setItem('Tokens', JSON.stringify({
                ...Token,
                'access_token': res.data.data.accessToken,
            }))
            navigate('/home');
        }
        catch(e){
            console.error("Error occurred during token refresh:", e);
            navigate("/login");
        }
    }
    isNavigating = false;
};