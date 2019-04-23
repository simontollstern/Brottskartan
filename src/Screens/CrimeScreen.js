import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent'
import CardComponent from '../Components/Card/CardComponent'

import MapComponent from '../Components/Map/MapComponent'
import FooterComponent from '../Components/Footer/FooterComponent';

class CrimeScreen extends Component {
  render() {
    return (
      <div>
        <CardComponent>
          <div className='dropdownWrapper'>
            <div className='dropdown'>Dropdown <div className="triangle-down"></div></div>
          </div>
        </CardComponent>
        <MapComponent></MapComponent>
        <FooterComponent />
      </div>
    )
  }
}


export default CrimeScreen;
