import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import wdata from './data/worldcities.json';
import Cookies from 'js-cookie';

//import {fire,getFireDB,setFireDB} from './Firebase'
//import SimpleMap from './SimpleMap'
import GoogleMap from './GoogleMap'

import { Button,Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//import Popup from 'react-popup';

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

    //console.log(Cookies.get('username'));
    if(Cookies.get('username') === undefined)
    {
      var userName = prompt('Please Enter your Name.');
      Cookies.set('username', userName);
    }
    else
    {
      alert("Welcome back " + Cookies.get('username'));
    }
  });

  var randomIdx=0;
  const getRandomCity=()=>{
    randomIdx= Math.floor(Math.random()*wdata.length);
    //return wdata[randomIdx];
  }

  return (
    <div>
      {getRandomCity()}
      <h2>Do you know where is... <font color="#ff00ff">{wdata[randomIdx].city}</font>?</h2>
      <GoogleMap selected={wdata[randomIdx]}/>
    </div>
  )
}


// ========================================

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
