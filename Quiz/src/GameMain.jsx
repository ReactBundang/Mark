import React, {createContext, useState, useEffect} from 'react'
import GoogleMap from './GoogleMap'
import wdata from './data/worldcities_lv1.json';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire} from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

export const AppContext = createContext();
const GameMain =() => {
  // 라운드 수
  const [round, setRound] = useState(1);
  const [cityName, setCityName] = useState();
  const [city, setCity] = useState();

  var randomIdx=0;
  const getRandomCity=()=>{
    randomIdx= Math.floor(Math.random()*wdata.length);
    console.log('getRandomCity a new city:' + wdata[randomIdx].city);
    //return wdata[randomIdx];
    setCityName(wdata[randomIdx].city);
    setCity(wdata[randomIdx]);
  }

  // 원하는 state 변경시 useEffect 호출되도록 설정 가능.
  useEffect(() => {
      console.log("useEffect");
      getRandomCity();
  },[]);

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

  
  return (
    <AppContext.Provider value={round}>
      <div>
        <h2>Do you know where is... <font color="#ff00ff">{cityName}</font>?</h2>
        <GoogleMap selected={city} user={user} newRoundCallBack={getRandomCity}/>
      </div>
      </AppContext.Provider>
    )
}
export default GameMain;