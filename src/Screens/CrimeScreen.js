import React, { Component } from 'react';
import CardComponent from '../Components/Card/CardComponent';
import MapComponent from '../Components/Map/MapComponent';
import FooterComponent from '../Components/Footer/FooterComponent';

class CrimeScreen extends Component {
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


export default CrimeScreen;
