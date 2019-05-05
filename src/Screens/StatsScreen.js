import React, { Component } from 'react';

import Gmaps from '../Components/gmap/GmapsCrimesComponent';
import FooterComponent from '../../src/Components/Footer/FooterComponent';
import DashboardComponent from '../Components/Dashboard/DashboardComponent';

class StatsScreen extends Component {
  render() {
    return (
      <div>
        <DashboardComponent/>
        <Gmaps/>
        <FooterComponent/>
      </div>
    )
  }
}

export default StatsScreen;
