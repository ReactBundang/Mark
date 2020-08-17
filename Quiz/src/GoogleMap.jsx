import React, { Component }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {fire,getFireDB,setFireDB} from './Firebase'


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        fire();
        getFireDB();

        this.state= {
            fields: { location: {lat:0,lng:0}},
            currentLocation: {lat:0,lng:0}
        };
    };
    
    async componentDidMount() {
    
        const { lat, lng } = await this.getcurrentLocation();
        this.setState(prev => ({
          fields: {
            ...prev.fields,
            location: {
              lat,
              lng
            }
          },
          currentLocation: {
            lat,
            lng
          }
        }));
      }

      getcurrentLocation() {
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
      addMarker = (location, map) => {
        this.setState(prev => ({
          fields: {
            ...prev.fields,
            location
          }
        }));
        map.panTo(location);
        console.log(location.lat());
        console.log(location.lng());

        const lat1= location.lat();
        const lon1= location.lng();
        const lat2= this.props.selected.lat;
        const lon2= this.props.selected.lng;

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

  render() {
    return (
        <div style={{ height: '50%', width: '100%' }}>
            <Map google={this.props.google} zoom={1}
                onClick={(t, map, c) => this.addMarker(c.latLng, map)}>
                    <Marker position={this.state.fields.location} title="mark"/>
            </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)