import React, {useState, useEffect} from 'react';

import './App.css';
import {fire,getFireDB,setFireDB} from './Firebase'
import List from './List.jsx'

import { Button,Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const App= () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(); //입력값 저장용.

  // input 키입력 onChange 이벤트
  const InputChanged = (e) => {
    setNewTodo(e.target.value);
  }

  const KeyPressed = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      if(todos!=undefined)
        setTodos([...todos, newTodo]);
    }
    
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
    <Card className={classes.root} id="card_main">
      <CardContent>
      <Typography variant="h5" component="h2">Todo App</Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
      With react hooks + firebase!</Typography>
      <form action="" onKeyPress={KeyPressed}>
        <Input type="text" onChange={InputChanged}/>
        <Button onClick={addTodo}>Add</Button>
      </form>
      <List todos={todos}/>
      </CardContent>
    </Card>
  )
}

export default App;
