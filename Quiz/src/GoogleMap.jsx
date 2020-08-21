import React, { Component, useState, useEffect }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import * as firebase from 'firebase'
import {setLocationInfoDB} from './Firebase'
import { useList, useObject, useListVals } from 'react-firebase-hooks/database';
import Swal from 'sweetalert2';

// images
import IMG_maker1 from './data/marker1.png';
import IMG_maker2 from './data/marker2.png';
import IMG_maker3 from './data/marker3.png';
import IMG_maker4 from './data/marker4.png';
// image array
const IMG_markers=[
  require('./data/marker1.png'),
  require('./data/marker2.png'),
  require('./data/marker3.png'),
  require('./data/marker4.png')
]

export const MapContainer=(props)=>{
  const [fields, setFields]=useState({ location: {lat:0,lng:0}});
  const [fields2, setFields2]=useState({ location: {lat:50,lng:10}});
  const [currentLocation, setCurrentLocation]= useState({lat:0,lng:0});

  const db= firebase.database();
  const [snapshots, loading, error] = useList(db.ref('users'));
  
    const getcurrentLocation=()=> {
      if (navigator && navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords;
            resolve({
              lat: coords.latitude,
              lng: coords.longitude
            });
          });
        });
      }
      return {
        lat: 0,
        lng: 0
      };
    }
  
    const addMarker = (location2, map) => {
      
      setFields({ ...fields, location: location2});
      map.panTo(location2);

      if(props.user)
      {
        // var key= props.user.displayName;
        // console.log(key);
        // if(key==null)
        //   key=props.user.uid;
        setLocationInfoDB(props.user.uid, location2, props.user.displayName);
      }
      
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
      if(d > 1000000)
          alert(Math.floor(d/1000)+"KM far!");
      else
          alert("Awesome!");
    };

  useEffect(async ()=> {
    const { lat2, lng2 } = await getcurrentLocation();
    setFields({ ...fields, location: {lat:lat2, lng:lng2 }});
    setCurrentLocation({ lat2,lng2 });
  }, []);

  return(<div>
          <Map mapTypeControl={false} streetViewControl={false} google={props.google} zoom={2}
              onClick={(t, map, c) => addMarker(c.latLng, map)}>

                  {snapshots.map((v, idx)=> {
                    var res= JSON.parse(v.val());
                    console.log(idx);
                    //var res= v.val().split(",");
                    var locationInfo= {lat:res[0],lng:res[1]};
                    console.log(locationInfo);
                    return(<Marker position={locationInfo} key={res} icon={{url:IMG_markers[idx]}}/>);
                    //
                    //const test= JSON.parse(v.val());
                    // "{lat: 50.37748802942986,lng: 99.05832701094614, name:null}"
                    //"\"{lat: 47.99839155402875,lng: 31.79933042372131, name:null}\""
                  })}
                
                {/* <Marker position={fields2.location}
                        icon={{url:IMG_markers[1]}}/> */}

                <InfoWindow visible={true}>
                <div>
                  <h1>hdajksdhklas</h1>
                </div>
                </InfoWindow>
          </Map>
        </div>);
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)