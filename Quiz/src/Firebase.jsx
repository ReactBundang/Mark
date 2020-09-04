import * as firebase from 'firebase'

let database;
let firebaseConfig = {
    apiKey: "AIzaSyDNWOwUle6rwAveRW3WgqTHj6z6w7fcR-w",
    authDomain: "porking-cd568.firebaseapp.com",
    databaseURL: "https://porking-cd568.firebaseio.com",
    projectId: "porking-cd568",
    storageBucket: "porking-cd568.appspot.com",
    messagingSenderId: "295289843735",
    appId: "1:295289843735:web:3025fdda3a54c389f92c52"
  };

  export const fire= () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("fire!");
    }
    database= firebase.database();
  }

  // Refer to https://firebase.google.com/docs/auth/web/google-signin
  export const createViaGoogle=()=> {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  export const createEmailID=(email, password)=>{
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  }

  export const getFireDB= async (path, key)=> {
      var a= database.ref(path+"/"+key).on('value');
      return await a.then(res=>{
          console.log(res.val());
          return res.val();
      })
  }

  export const setFireDB=(path, key, value)=>{
        var a= database.ref(path).child(key);
        a.set(`${value}`);
    }

export const setLocationInfoDB=(uid, location, dispName, howFar, score)=>{
        var a= database.ref('/users/').child(uid);
        //var obj= `{lat: ${location.lat()},lng: ${location.lng()}, name:${dispName}}`;
        var arr= [location.lat(), location.lng(), dispName, howFar, score];
        a.set(JSON.stringify(arr));
    }


export const LogoutAndDelteSession=(uid)=>{
  var a= database.ref('/users/').child(uid);
  a.remove();
}