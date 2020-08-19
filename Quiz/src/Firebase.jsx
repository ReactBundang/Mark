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

  export const getFireDB=()=> {
      var a= database.ref('/places/').once('value');
      a.then(res=>{
          console.log(res.val()[1].item);
      })
  }

  export const setFireDB=(last)=>{
        var a= database.ref('/todos/').once('value');
        a.then(res=>{
            //console.log(res.val());
            //console.log(last);
            database.ref(`todos/`).set([...res.val(),last]);
        })
    }