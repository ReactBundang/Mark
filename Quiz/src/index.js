import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {fire,getFireDB,setFireDB} from './Firebase'
//import SimpleMap from './SimpleMap'

import { Button,Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
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
          <Link to="/single">Singleplay</Link>
        </li>
        <li>
          <Link to="/multi">Multiplay</Link>
        </li>
      </ul>
      <hr />
      <Route path="/single" exact={true} component={Home} />
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
