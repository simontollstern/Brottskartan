import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent';
import FooterComponent from '../Components/Footer/FooterComponent';
import CardComponent from '../Components/Card/CardComponent';

class StationsScreen extends Component {
  render() {
    return (
      <div>
        <CardComponent></CardComponent>
        <MapComponent></MapComponent>
        <FooterComponent />
      </div>
    )
  }
}

export default StationsScreen;
