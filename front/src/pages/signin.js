import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
      setDisabled(!(id && password && !errorMessage));
  }, [id, password, errorMessage]);

  const _onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(SERVER_URL, {
      id: id,
      password: password
    }).then((response) => {
      if (response === 'success') {
        alert("로그인 성공");
        <Link to="/home"/>
      }
      else {
        setErrorMessage('아이디 비밀번호를 확인해주세요.');
      }
    });
  };

  const _onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const _onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Form>
          <Input type='text' value={id} onChange={_onIdHandler} placeholder='Id'/>
          <Input type='password' value={password} onChange={_onPasswordHandler} placeholder='PassWord'/>
          <ErrorText>{errorMessage}</ErrorText>
          <Button disabled={disabled} onSubmit={_onSubmitHandler}>
              Login
          </Button>
      </Form>
      <Link to="/signup" style={{marginTop: '20px'}}>
        <label>회원가입</label>
      </Link>
    </div>
  )
}

export default SignIn
