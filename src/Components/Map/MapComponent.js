import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import style from './MapComponent.module.css'

export class MapComponent extends Component {
  render() {
    return (
      <Map google={this.props.google}
           zoom={5.3}
           initialCenter={{lat: 62.8,lng: 17.5671981}}
           mapTypeControl={false}
           fullscreenControl={false}
           streetViewControl={false}
           >
           <Marker position={{lat: 63.1983366,lng: 17.5671981}} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTDUngu6DGdd00qppeaMUj7RhYuUfFOBI',
  language: 'sv-se'
})(MapComponent)
