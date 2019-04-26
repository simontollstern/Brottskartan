import React, { Component } from 'react'
import MapComponent from '../Components/Map/MapComponent';
import { getCrimes } from '../Redux/actions';
import { connect } from 'react-redux';

class CrimeScreen extends Component {
  //Get the crime events from the Swedish police api
  componentDidMount() {
    fetch('https://polisen.se/api/events')
        .then(response => response.json())
        .then(data => this.props.getCrimes(data));
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
