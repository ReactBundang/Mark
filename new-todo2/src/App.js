import React, {useState, useEffect} from 'react';
import './App.css';
import {fire,getFireDB} from './Firebase'
import List from './List.jsx'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';


const App= () => {
  const [todos, setTodos] = useState(['ddddd']);
  const [newTodo, setNewTodo] = useState(); //입력값 저장용.

  
  const InputChanged = (e) => {
    setNewTodo(e.target.value);
  }

  fire();
  getFireDB();

  const addTodo=(e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
  }
  useEffect(() => {
    console.log("useEffect");
    //fire();
  })

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
