import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import {fire,getFireDB,setFireDB} from './Firebase'
import SimpleMap from './SimpleMap'

import { Button,Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';




const App= () => {

  // input 키입력 onChange 이벤트
  const InputChanged = (e) => {
  }

  const KeyPressed = (e) => {
  }

  // firebase library 초기화
  //fire();

  // 원하는 state 변경시 useEffect 호출되도록 설정 가능.
  useEffect(() => {
    console.log("useEffect");
  });

  return (
    <div>
      <SimpleMap/>
    </div>
  )
}


// ========================================

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
