import React, { Component } from 'react'
import CrimeMap from '../Components/gmap/GmapsCrimesComponent';
import { getCrimes } from '../Redux/actions';
import { connect } from 'react-redux';

import DashboardComponent from '../../src/Components/Dashboard/DashboardComponent'
import FooterComponent from '../../src/Components/Footer/FooterComponent';


class CrimeScreen extends Component {
  //Get the crime events from the Swedish police api

  getLatestData = () =>{
    fetch('https://api.brottskarta.se/dagens')
    .then(response => response.json())
    .then(data => {

      // Remove wanted "crimes" from API
     const removedDataFromCrimes = ['Arbetsplatsolycka', 'Fjällräddning', 'Försvunnen person', 'Gränskontroll', 'Kontroll person/fordon', 'Naturkatastrof', 'Sammanfattning dag', 'Sammanfattning dygn', 'Sammanfattning eftermiddag', 'Sammanfattning förmiddag', 'Sammanfattning helg', 'Sammanfattning kväll', 'Sammanfattning kväll och natt', 'Sammanfattning natt','Sammanfattning vecka', 'Sjukdom/olycksfall', 'Tillfälligt obemannat', 'Trafikhinder', 'Trafikkontroll', 'Trafikolycka', 'Trafikolycka, personskada', 'Trafikolycka, singel', 'Trafikolycka, smitning från', 'Trafikolycka, vilt', 'Uppdatering', 'Vaninglarm/haveri'];

     // Filter wanted crimes into a new array
     const filteredCrimes = data.filter(crime => {
       // If crime.type does not exist in !removedDataFromCrimes, return the crime.type to filteredCrimes array
       return !removedDataFromCrimes.includes(crime.type);
     });

     // Pass the new array with crimes to get Crimes
      this.props.getCrimes(filteredCrimes);
    })
  }

  // getAllData = () =>{
  //   fetch('https://api.brottskarta.se/dagens')
  //   .then(response => response.json())
  //   .then(data => this.props.getCrimes(data))
  // }

  componentDidMount() {
     this.getLatestData();
    //timer that call a function to get new data from the Polis-api
    setInterval(() => {
      this.getLatestData();
    }, 300000);
  }

  render() {
    return (
      <div>
        <DashboardComponent />
        <CrimeMap />
        <FooterComponent />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCrimes: (crimes) => dispatch(getCrimes(crimes))
})

export default connect(null, mapDispatchToProps)(CrimeScreen);
