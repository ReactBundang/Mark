import React, { Component }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
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
      };

    onMarkerClick(props, marker, e) {
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
      }

  render() {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Map google={this.props.google} zoom={1}
                onClick={(t, map, c) => this.addMarker(c.latLng, map)}>
                    <Marker position={this.state.fields.location} />
            </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBoQU60M7zCX7m5SywNmDU2cJo7jYT02A4")
})(MapContainer)