import { useEffect, useState } from "react";
import { getTokenFromLocal } from "../utils/token";
import { useNavigate } from 'react-router-dom';

const SERVER_URL = "/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const Token = getTokenFromLocal();

  const fetchData = async () => {
    try{
      if(Token !== null) {
        const response = await fetch(`${SERVER_URL}/mytodo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.accessToken}`,
          },
          body: JSON.stringify({
            email: Token.userId,
          }),
        });
        if(response.status === 401){
          navigate('/login');
          return;
        }
        const data = await response.json();
        setTodoList(data);
      }
      else{
        navigate('/login');
      }
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const _onSubmitHandler = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    try{
      fetch(`${SERVER_URL}/uploadtodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token.accessToken}`,
        },
        body: JSON.stringify({
          email: Token.userId,
          text,
          done,
        }),
      }).then(() => fetchData());
    }
    catch(err){
      console.log(err);
    }
  };

  const _onLogOutHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={_onSubmitHandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      {todoList.map((todo) => (
        <div key={todo.id} style={{display: 'flex'}}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'Y' : 'N'}</div>
        </div>
      ))}
      <button onClick={_onLogOutHandler}>로그아웃</button>
    </div>
  );
}

export default App;
