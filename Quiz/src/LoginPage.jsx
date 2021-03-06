import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire,createEmailID, getFireDB,setFireDB} from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button,Input, Card, CardActions, CardContent,Typography } from '@material-ui/core';
import Swal from 'sweetalert2';

const LoginPage=()=> {
  const [myID, setID] = useState();
  const [myPW, setPW] = useState();
    
  fire();
  const [user, loading, error] = useAuthState(firebase.auth());
    
  const Logout=()=>{
    firebase.auth().signOut();
  }

  if (loading) {
      console.log("loading...");
      return(<div><p>Loading...</p></div>)
  }
  if (error) {
    console.log("Error: "+{error});
  }
  if (user) {
    return (
      <div>
        {Swal.hideLoading()}
        <p>Current User: {user.email}</p>
        <Button onClick={Logout}>Log out</Button>
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
      Swal.showLoading();
      console.log("login with " + myID+" / " +myPW);

      try{
        firebase.auth().signInWithEmailAndPassword(myID, myPW);
      }catch(error){
        if(error.code==="auth/invalid-email") {
          Swal.fire("Please enter your email correctly.");
        }
        else if(error.code==="auth/argument-error") {
          Swal.fire("Please enter your password.");
        }
        else{
          alert(error);
        }
      }
      
      setID("");
      setPW("");
  }
  
  const Signup=()=>{
    console.log("signup with " + myID+" / " +myPW);
      createEmailID(myID, myPW);
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
