import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getTokens } from '../utils/token';

const Button = styled.button`
  background-color: black;
  color : white;
  padding : 10px;
  border-radius: 5px;
  cursor : pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.label`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: red;
`;

const Input = styled.input`
  padding : 5px;
  margin : 10px 0;
  border-radius: 5px;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

  const _onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const result = await getTokens(email, password);
        if (result === null) {
            navigate('/home');
        } else {
            setErrorMessage(result);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
    
  };

  const _onSignUpHandler = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  const _onIdHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const _onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Form onSubmit={_onSubmitHandler}>
          <Input type='email' value={email} onChange={_onIdHandler} placeholder='Email'/>
          <Input type='password' value={password} onChange={_onPasswordHandler} placeholder='PassWord'/>
          <ErrorText>{errorMessage}</ErrorText>
          <Button>Login</Button>
      </Form>
      <Button onClick={_onSignUpHandler}>회원가입</Button>
    </div>
  )
}

export default SignIn
