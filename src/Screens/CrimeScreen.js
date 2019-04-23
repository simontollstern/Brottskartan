import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent'

import MapComponent from '../Components/Map/MapComponent'
import FooterComponent from '../Components/Footer/FooterComponent';

class CrimeScreen extends Component {
  render() {
    return (
      <div>
        <MapComponent></MapComponent>
        <FooterComponent />
      </div>
    )
  }
}


export default CrimeScreen;
