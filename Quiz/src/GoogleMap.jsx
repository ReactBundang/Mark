import React, { Component, useState, useEffect }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export const MapContainer=(props)=>{
  const [fields, setFields]=useState({ location: {lat:0,lng:0}});
  const [currentLocation, setCurrentLocation]= useState({lat:0,lng:0});
  
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
      // this.setState(prev => ({
      //   fields: {
      //     ...prev.fields,
      //     location
      //   }
      // }));
      setFields({ ...fields, location: location2});
      //setFields({...fields, location:{lat:location2.lat, lng:location2.lng}});
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

  return(<div style={{ height: '50%', width: '100%' }}>
          <Map google={props.google} zoom={1}
              onClick={(t, map, c) => addMarker(c.latLng, map)}>
                <Marker position={fields.location} />
          </Map>
        </div>);
}

// export class MapContainer extends Component {
//     constructor(props) {
//         super(props);
//         console.log(props);
//         this.state= {
//             fields: { location: {lat:0,lng:0}},
//             currentLocation: {lat:0,lng:0}
//         };
//     };
    
//     async componentDidMount() {
//         const { lat, lng } = await this.getcurrentLocation();
//         this.setState(prev => ({
//           fields: {
//             ...prev.fields,
//             location: {
//               lat,
//               lng
//             }
//           },
//           currentLocation: {
//             lat,
//             lng
//           }
//         }));
//       }

//       getcurrentLocation() {
//         if (navigator && navigator.geolocation) {
//           return new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(pos => {
//               const coords = pos.coords;
//               resolve({
//                 lat: coords.latitude,
//                 lng: coords.longitude
//               });
//             });
//           });
//         }
//         return {
//           lat: 0,
//           lng: 0
//         };
//       }
//       addMarker = (location, map) => {
//         this.setState(prev => ({
//           fields: {
//             ...prev.fields,
//             location
//           }
//         }));
//         map.panTo(location);
//         console.log(location.lat());
//         console.log(location.lng());

//         const lat1= location.lat();
//         const lon1= location.lng();
//         const lat2= this.props.selected.lat;
//         const lon2= this.props.selected.lng;

//         const R = 6371e3; // metres
//         const φ1 = lat1 * Math.PI/180; // φ, λ in radians
//         const φ2 = lat2 * Math.PI/180;
//         const Δφ = (lat2-lat1) * Math.PI/180;
//         const Δλ = (lon2-lon1) * Math.PI/180;

//         const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//           Math.cos(φ1) * Math.cos(φ2) *
//           Math.sin(Δλ/2) * Math.sin(Δλ/2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//         const d = R * c; // in metres
//         if(d > 1000000)
//             alert(Math.floor(d/1000)+"KM far!");
//         else
//             alert("Awesome!");
        
//       };

//   render() {
//     return (
//         <div style={{ height: '50%', width: '100%' }}>
//             <Map google={this.props.google} zoom={1}
//                 onClick={(t, map, c) => this.addMarker(c.latLng, map)}>
//                   <Marker position={this.state.fields.location} />
//             </Map>
//       </div>
//     );
//   }
// }

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)