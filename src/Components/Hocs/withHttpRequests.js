import React, { Component } from 'react'
// This function takes a component...
export default function witHttpRequests(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends Component {

    //Get the crime events from the Swedish police api
    getEvents = () => {
     return fetch('https://polisen.se/api/events');
    }

    //Get the police stations from the Swedish police api
    getStations = () => {
      return fetch('https://polisen.se/api/policestations');
    }

    //Get stats from Simons Api 

  
    render() {   
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return(
        <WrappedComponent 
          getEvents={this.getEvents}
          getStations={this.getStations}
          {...this.props} 
        />
      ) 
    }
  };
}