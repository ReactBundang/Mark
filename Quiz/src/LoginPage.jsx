import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire,getFireDB,setFireDB} from './Firebase'

import { Button,Input, Card, CardActions, CardContent,Typography } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

const LoginPage=()=> {
  const [myID, setID] = useState();
  const [myPW, setPW] = useState();
    
  fire();
  const [user, loading, error] = useAuthState(firebase.auth());

  

  if (loading) {
      console.log("loading...");
  }
  if (error) {
    alert("Error: "+{error});
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick="">Log out</button>
      </div>
    );
  }
  // input 키입력 onChange 이벤트
  const InputIDChanged = (e) => {
    setID(e.target.value);
  }

  const InputPWChanged = (e) => {
    setPW(e.target.value);
  }

  const Login=()=>{
      console.log("login with " + myID+" / " +myPW);
      firebase.auth().signInWithEmailAndPassword(myID, myPW);
  }
  
  const Signup=()=>{
      
  }

  const KeyPressed = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }


    return(
        <Card className="root" id="card_main">
            <CardContent>
            <Typography variant="h5" component="h2">Sign In</Typography>
            <Typography className="second" color="textSecondary" gutterBottom>
            With react hooks + firebase!</Typography>
            <form action="" onKeyPress={KeyPressed}>
                <Input type="text" onChange={InputIDChanged}/>
                <br></br>
                <Input type="password" onChange={InputPWChanged}/>
                <br></br>
                <Button onClick={Login}>Login</Button>
                <Button onClick={Signup}>Sign Up</Button>
            </form>
            </CardContent>
        </Card>
    )
}
export default LoginPage;
