import React, { Component } from 'react';
import StationMap from '../Components/gmap/GmapStationsComponent';
import { getStations } from '../Redux/actions';
import { connect } from 'react-redux'

import DashboardComponent from '../../src/Components/Dashboard/DashboardComponent'
import FooterComponent from '../../src/Components/Footer/FooterComponent';

class StationsScreen extends Component {

  componentDidMount() {
    this.getStations();
  }

   //Get the police stations from the Swedish police api
   getStations = () => {
    fetch('https://polisen.se/api/policestations')
    .then(response => response.json())
    .then(data => this.props.getStations(data))
  }

  render() {
    return (
      <div>
        <DashboardComponent/>
        <StationMap/>
        <FooterComponent/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStations: (stations) => dispatch(getStations(stations))
})

export default connect(null, mapDispatchToProps)(StationsScreen);

