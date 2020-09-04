import React, { useContext, useState, useEffect }  from 'react';
import { AppContext } from "./GameMain";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import * as firebase from 'firebase'
import {setLocationInfoDB} from './Firebase'
import { useList } from 'react-firebase-hooks/database';
//import Swal from 'sweetalert2';

import PlayerInfo from './PlayerInfo'

// image array
const IMG_markers=[
  require('./data/marker1.png'),
  require('./data/marker2.png'),
  require('./data/marker3.png'),
  require('./data/marker4.png')
]

export const MapContainer=(props)=>{
  const {round,setRound} = useContext(AppContext);
  //const [fields, setFields]=useState({ location: {lat:0,lng:0}});
  //const [fields2, setFields2]=useState({ location: {lat:50,lng:10}});
  const [howFar, setHowFar]=useState(0);
  const [score, setScore]=useState(0);
  //const [currentLocation, setCurrentLocation]= useState({lat:0,lng:0});

  const db= firebase.database();
  const [snapshots, loading, error] = useList(db.ref('users'));
  
  const addMarker = (location2, map) => {
    
    //setFields({ ...fields, location: location2});
    map.panTo(location2);

    console.log(location2.lat());
    console.log(location2.lng());

    const lat1= location2.lat();
    const lon1= location2.lng();
    const lat2= props.selected.lat;
    const lon2= props.selected.lng;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    var inKM= Math.floor(d/1000);
    setHowFar(inKM);

    if(props.user) {
      setLocationInfoDB(props.user.uid, location2, props.user.displayName, inKM, score);
    }

    if(d > 1000000)
    {
        //alert(inKM+"KM far!");
    } else {
        setScore(score+1);
        props.newRoundCallBack();
        alert("Awesome!");
    }
  };

  useEffect( ()=> {
    // const { lat2, lng2 } = await getcurrentLocation();
    // setFields({ ...fields, location: {lat:lat2, lng:lng2 }});
    // setCurrentLocation({ lat2,lng2 });
  }, []);

  return(<div>
          {snapshots.map((v, idx)=> {
            var res= JSON.parse(v.val());
            //console.log(res);
            return(<PlayerInfo idx={idx} key={idx} name={res[2]} howfar={res[3]} score={res[4]}/>);
          })}
          <Map mapTypeControl={false} streetViewControl={false} google={props.google} zoom={2}
              onClick={(t, map, c) => addMarker(c.latLng, map)}>

                  {snapshots.map((v, idx)=> {
                    var res= JSON.parse(v.val());
                    //var res= v.val().split(",");
                    var locationInfo= {lat:res[0],lng:res[1]};
                    //console.log(locationInfo);
                    return(<Marker position={locationInfo} key={res} icon={{url:IMG_markers[idx]}}/>);
                    //
                    //const test= JSON.parse(v.val());
                    // "{lat: 50.37748802942986,lng: 99.05832701094614, name:null}"
                    //"\"{lat: 47.99839155402875,lng: 31.79933042372131, name:null}\""
                  })}
          </Map>
        </div>);
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)