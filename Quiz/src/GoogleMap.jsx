import React, { Component, useState, useEffect }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import * as firebase from 'firebase'
import {setLocationInfoDB} from './Firebase'
import { useList, useObject, useListVals } from 'react-firebase-hooks/database';
import Swal from 'sweetalert2';

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

      setLocationInfoDB('thks10', location2);
      
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
          Swal.fire(Math.floor(d/1000)+"KM far!");
      else
          Swal.fire("Awesome!");
    };

  useEffect(async ()=> {
    const { lat2, lng2 } = await getcurrentLocation();
    setFields({ ...fields, location: {lat:lat2, lng:lng2 }});
    setCurrentLocation({ lat2,lng2 });
  }, []);

  return(<div style={{ height: '50%', width: '100%' }}>
          <Map google={props.google} zoom={1}
              onClick={(t, map, c) => addMarker(c.latLng, map)}>

            {!loading && snapshots && (
                        <React.Fragment>
                        </React.Fragment>
                        )}
                <Marker position={fields.location}
                      icon={{url:"https://mitchin.s3.ap-northeast-2.amazonaws.com/backup/react/icons/marker1.png"}}/>
                <Marker position={fields2.location}
                        icon={{url:"https://mitchin.s3.ap-northeast-2.amazonaws.com/backup/react/icons/marker2.png"}}/>
          </Map>
        </div>);
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)