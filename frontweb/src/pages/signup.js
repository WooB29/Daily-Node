import React, {useState} from 'react'
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
const SERVER_URL = "/api/signup";

const Button = styled.button`
  background-color: black;
  color : white;
  padding : 10px;
  border-radius: 5px;
  cursor : pointer;
`;

const ErrorText = styled.label`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding : 5px;
  margin : 10px 0;
  border-radius: 5px;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();


  const _onIdHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const _onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  };

  const _onRePasswordHandler = (e) => {
    setRePassword(e.currentTarget.value);
};

  const _onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const _onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!email.trim() || !password.trim() || !name.trim()) {
      setErrorMessage('이메일, 비밀번호, 이름을 입력해주세요.');
      return;
    }
    if(password !== rePassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    };

    try {
      const response = await axios.post(SERVER_URL, {
        email: email,
        password: password,
        name: name
      });

      if (response.status === 200){
        alert('회원가입 성공');
        navigate('/');
      }

    } catch (error) {
      if(error.response.status === 409){
        setErrorMessage('이미 존재하는 이메일입니다.');
      }
      else{
        setErrorMessage('회원가입 중 오류가 발생하였습니다.');
      }
      console.error('회원가입 중 오류 발생:', error);
    }
  };
    

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Form onSubmit={_onSubmitHandler}>
        <Input type="email" placeholder="Email" value={email} onChange={_onIdHandler}/>
        <Input type="password" placeholder="passWord" value={password} onChange={_onPasswordHandler}/>
        <Input type='password' placeholder='Re PassWord' value={rePassword} onChange={_onRePasswordHandler}/>
        <Input type="text" placeholder="Name" value={name} onChange={_onNameHandler}/>
        <ErrorText>{errorMessage}</ErrorText>
        <Button>가입</Button>
      </Form>
      <div>
        <Link to="/" style={{marginTop: '20px'}}>
          <label>취소</label>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
