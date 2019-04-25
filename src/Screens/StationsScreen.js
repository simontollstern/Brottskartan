import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent';

class StationsScreen extends Component {
  componentDidMount() {
    console.log('Policestations: ')
    this.getStations();
  }

   //Get the police stations from the Swedish police api
   getStations = () => {
    fetch('https://polisen.se/api/policestations')
    .then(response => response.json())
    .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        <MapComponent></MapComponent>
      </div>
    )
  }
}

export default StationsScreen;
