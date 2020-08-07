import React, {useState, useEffect} from 'react';

import './App.css';
import {fire,getFireDB,setFireDB} from './Firebase'
import List from './List.jsx'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';


const App= () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(); //입력값 저장용.

  // input 키입력 onChange 이벤트
  const InputChanged = (e) => {
    setNewTodo(e.target.value);
  }

  // firebase library 초기화
  fire();

  // 버튼 onClick event
  const addTodo=(e) => {
    e.preventDefault();
    console.log(todos);
    if(todos!=undefined)
      setTodos([...todos, newTodo]);
  }

  // 원하는 state 변경시 useEffect 호출되도록 설정 가능.
  useEffect(() => {
    console.log("useEffect");
    getFireDB();
    if(todos.length!=0)
    {
      var lastIdx= todos[todos.length-1];
      setFireDB(lastIdx);
    }
  }, [todos]);

  return (
    <>
      <h1>Todo App</h1>
      <form action="">
        <Input type="text" onChange={InputChanged}/>
        <Button onClick={addTodo}>Add</Button>
      </form>
      <List todos={todos}/>
    </>
  )
}

export default App;
