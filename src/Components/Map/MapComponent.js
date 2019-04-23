import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import style from './MapComponent.module.css'

export class MapComponent extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={5.5} initialCenter={{lat: 63.1983366,lng: 17.5671981}}>

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTDUngu6DGdd00qppeaMUj7RhYuUfFOBI',
  language: 'sv-se'
})(MapComponent)
