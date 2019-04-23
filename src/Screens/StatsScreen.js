import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent';
import FooterComponent from '../Components/Footer/FooterComponent';
import CardComponent from '../Components/Card/CardComponent';

class StatsScreen extends Component {
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

export default StatsScreen;
