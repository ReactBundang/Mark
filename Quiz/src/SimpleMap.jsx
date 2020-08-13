import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import dotenv from 'dotenv';
dotenv.config();

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const apiKey = process.env.GOOGLE_MAP_API_KEY; 
console.log(apiKey);

const aaaa=()=> {
console.log("aaa");
}

function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"

    //[{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
    return {
        MaxZoomStatus: 15,
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 29.95,
      lng: 130.33
    },
    styles: [{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]}],
    zoom: 0
  };


  render() {
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"            
          />
          <Marker text="djaskldjsalkdjlkasd" onClick={aaaa}/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;