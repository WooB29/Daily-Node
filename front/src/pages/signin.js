import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from "axios";
const SERVER_URL = "/api/login";

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
    try{
      const response = await axios.post(SERVER_URL, {
        email: email,
        password: password
      });

      if (response.status === 200){
        alert('로그인 성공');
        navigate('/home');
      }

    } catch (error) {
      if(error.response.status === 409){
        setErrorMessage('일치하는 회원정보가 없습니다.');
      }
      else{
        setErrorMessage('로그인 중 오류가 발생하였습니다.');
      }
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const _onTestHendler = async (e) => {
    e.preventDefault();
    try{
      await axios.get('/api/connect');
      setErrorMessage('연결성공');
    }
    catch (error) {
      setErrorMessage('연결안됨');
      console.error('연결 중 오류 발생:', error);
    }
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
      <Link to="/signup" style={{marginTop: '20px'}}>
        <label>회원가입</label>
      </Link>
      <Form onSubmit={_onTestHendler}>
        <Button>연결테스트</Button>
      </Form>
      
    </div>
  )
}

export default SignIn
