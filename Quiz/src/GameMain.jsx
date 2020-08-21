import React, {Component, useEffect} from 'react'
import GoogleMap from './GoogleMap'
import wdata from './data/worldcities_lv1.json';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire} from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const GameMain =() =>
{
    // 원하는 state 변경시 useEffect 호출되도록 설정 가능.
    useEffect(() => {
        console.log("useEffect");
    });

    fire();
    const [user, loading, error] = useAuthState(firebase.auth());
    if(loading) {
      return(<div>Loading...</div>)
    }
    if (error) {
      console.log("Error: "+{error});
    }
    if(user===null){
      return(<div>Please login first</div>)
    }

    var randomIdx=0;
    const getRandomCity=()=>{
        randomIdx= Math.floor(Math.random()*wdata.length);
        //return wdata[randomIdx];
    }
    
    return (
        <div>
          {getRandomCity()}
          <h2>Do you know where is... <font color="#ff00ff">{wdata[randomIdx].city}</font>?</h2>
          <GoogleMap selected={wdata[randomIdx]} user={user}/>
        </div>
      )
}
export default GameMain;