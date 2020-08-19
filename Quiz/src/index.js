import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {fire,getFireDB,setFireDB} from './Firebase'
//import SimpleMap from './SimpleMap'

import { AppBar, TabPanel, Tabs, Tab, Paper, Button,Input, Card, CardActions, CardContent,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import GameMain from './GameMain';

const App= () => {

  // input 키입력 onChange 이벤트
  const InputChanged = (e) => {
  }

  const KeyPressed = (e) => {
  }

  // firebase library 초기화
  //fire();


  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/multi">Multiplay</Link>
        </li>
      </ul>
      <hr />
      <Route path="/login" exact={true} component={LoginPage} />
      <Route path="/multi" component={GameMain} />
    </div>
    </Router>
  )
}


// ========================================

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
