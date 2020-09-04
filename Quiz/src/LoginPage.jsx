import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import * as firebase from 'firebase'
import {fire,createEmailID, createViaGoogle, LogoutAndDelteSession} from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

// image
import IMG_btn_google from './data/btn_google_signin_light_normal_web.png';

// import { Button,Input, Card, CardActions, CardContent,Typography } from '@material-ui/core';
import { Button, Form, Input } from 'antd';
import "antd/dist/antd.css";

import Swal from 'sweetalert2';

const LoginPage=()=> {
  //const [myID, setID] = useState();
  //const [myPW, setPW] = useState();
    
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
        <Button type="primary" onClick={Logout}>Log out</Button>
      </div>
    );
  }

  // input 키입력 onChange 이벤트
  const InputIDChanged = (e) => {
    //setID(e.target.value);
  }

  const InputPWChanged = (e) => {
    //setPW(e.target.value);
  }

  const Login= values =>{
      Swal.showLoading();
      console.log("login with " + values.username+" / " +values.password);

      try{
        firebase.auth().signInWithEmailAndPassword(values.username, values.password);
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
      
      //setID("");
      //setPW("");
  }
  
  const Signup=()=>{
    //console.log("signup with " + myID+" / " +myPW);
      //createEmailID(myID, myPW);
  }


  const KeyPressed = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const onFinish = values => {
    console.log('Received values of form: ', values);
  }
    return(
      <Form name='normal_login' className='login-form' initialValues={{remember:true}}
      onFinish={Login}>
        <Form.Item name='username' rules={[{required:true, message:'Please input your name!'}]}>
          <Input placeholder='Username'/>
        </Form.Item>
        <Form.Item name='password' rules={[{required:true, message:'Please input your password!'}]}>
          <Input type='password' placeholder='Password'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>Sign in</Button>
        </Form.Item>
      </Form>
        // <Card className="root" id="card_main">
        //     <CardContent>
        //     <Typography variant="h5" component="h2">Sign In</Typography>
        //     <Typography className="second" color="textSecondary" gutterBottom>
        //     With react hooks + firebase!</Typography>
        //     <form action="" onKeyPress={KeyPressed}>
        //         <Input type="text" onChange={InputIDChanged}/>
        //         <br></br>
        //         <Input type="password" onChange={InputPWChanged}/>
        //         <br></br>
        //         <Button onClick={Login}>Login</Button>
        //         <Button onClick={Signup}>Sign Up</Button>
        //     </form>
        //     </CardContent>
        //     <Button onClick={createViaGoogle}>
        //       <img src={IMG_btn_google}/>
        //     </Button>
        // </Card>
    )
}
export default LoginPage;
