import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire,createEmailID, createViaGoogle, LogoutAndDelteSession} from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

import IMG_btn_google from './data/btn_google_signin_light_normal_web.png';

import { Button,Input, Card, CardActions, CardContent,Typography } from '@material-ui/core';
import Swal from 'sweetalert2';

const LoginPage=()=> {
  const [myID, setID] = useState();
  const [myPW, setPW] = useState();
    
  fire();
  const [user, loading, error] = useAuthState(firebase.auth());
    
  const Logout=()=>{
    var user = firebase.auth().currentUser;
    LogoutAndDelteSession(user.uid);
    firebase.auth().signOut();
  }

  //https://firebase.google.com/docs/auth/web/manage-users
  const changeYourName=(e)=>{
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: e.target.value
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
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
        <p>displayName: <Input type="text" onChange={changeYourName} value={user.displayName}/>
          </p>
        <p>UID: {user.uid}</p>
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
            <Button onClick={createViaGoogle}>
              <img src={IMG_btn_google}/>
            </Button>
        </Card>
    )
}
export default LoginPage;
