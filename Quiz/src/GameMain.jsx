import React, {createContext, useState, useEffect} from 'react'
import GoogleMap from './GoogleMap'
import wdata from './data/worldcities_lv1.json';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire,getFireDB, setFireDB} from './Firebase'
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AppContext = createContext();
const GameMain =() => {
  // 라운드 수
  const [round, setRound] = useState(1);

  var randomIdx=0;
  // if someone got it right, update to the next city.
  const gotItRight=()=>{
    //SetNeedUpdate(true);
    console.log("gotItRight");
    randomIdx= Math.floor(Math.random()*wdata.length);
    setFireDB('mapgame', 'target', randomIdx);
    //getRandomCity();
  }

  fire();
  const db= firebase.database();
  const [value, loading_target, err_target] = useObject(db.ref('mapgame/target'));
  const [user, loading, error] = useAuthState(firebase.auth());

  if(loading || loading_target) {
    return(<div>Loading...</div>)
  }
  if (error || err_target) {
    console.log("Error: "+{error});
  }
  if(user===null){
    return(<div>Please login first</div>)
  }

  console.log(value.val());
  var idx = parseInt(value.val());
  var currCity= wdata[idx];

  //LoadFromServer(value.val());

  return (
    <AppContext.Provider value={round}>
      <div>
        <h2>Do you know where is... <font color="#ff00ff">{currCity.city}</font>?</h2>
        <GoogleMap selected={currCity} user={user} newRoundCallBack={gotItRight}/>
      </div>
      </AppContext.Provider>
    )
}
export default GameMain;