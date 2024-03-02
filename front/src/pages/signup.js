import React, {useState} from 'react'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from "axios";
const SERVER_URL = "/api/login";

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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage ] = useState('');

  

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Form>
        <Input type="text" placeholder="Id" value={id}/>
        <Input type="password" placeholder="passWord" value={password} />
        <Input type="text" placeholder="Name" value={name}/>
      </Form>
      <ErrorText>{errorMessage}</ErrorText>
      <div>
        <Button disabled={disabled}>회원가입</Button>
        <Link to="/" style={{marginTop: '20px'}}>
          <label>취소</label>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
