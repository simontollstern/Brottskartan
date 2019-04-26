import React, { Component } from 'react';
import Gmaps from '../Components/gmapstest/GmapsComponent';

class StationsScreen extends Component {
  componentDidMount() {
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
        <Gmaps/>
      </div>
    )
  }
}

export default StationsScreen;
