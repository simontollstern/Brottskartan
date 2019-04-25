import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent';
import { getCrimes } from '../Redux/actions';
import { connect } from 'react-redux';

class CrimeScreen extends Component {
  //Get the crime events from the Swedish police api
 
  getData = () =>{
    fetch('https://polisen.se/api/events')
    .then(response => response.json())
    .then(data => this.props.getCrimes(data))
  }

  
  componentDidMount() {
    this.getData();
    //timer that call a function to get new data from the Polis-api
    setInterval(() => {
      this.getData();
    }, 350000);
  }

  // Get all the crimes from the polices API
  // getCrimes = () => {
  //   fetch('https://polisen.se/api/events')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  render() {
    return (
      <div>
        <MapComponent></MapComponent>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCrimes: (crimes) => dispatch(getCrimes(crimes))
})

export default connect(null, mapDispatchToProps)(CrimeScreen);
