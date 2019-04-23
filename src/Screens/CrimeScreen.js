import React, { Component } from 'react'
import NavbarComponent from '../Components/Navbar/NavbarComponent';
import MapComponent from '../Components/Map/MapComponent';
import CardComponent from '../Components/Card/CardComponent';


class CrimeScreen extends Component {
  render() {
    return (
      <div>
        <CardComponent></CardComponent>
        {/* <MapComponent></MapComponent> */}
      </div>
    )
  }
}


export default CrimeScreen;
