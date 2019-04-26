import React, { Component } from 'react';
// import style from './GmapsComponent.module.css';
import { connect } from 'react-redux';

class GmapsComponent extends Component {

  map;

  componentDidMount () {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3
    });
    this.renderMarkers(this.map);
  }

  componentDidUpdate() {
    this.renderMarkers(this.map);
  }

  mapStyle = {
    width: "100%",
    height: "100vh"
  };

  renderMarkers = (map) => {
    console.log(map)
    for(let crime of this.props.crimes){
      // if crime type ISNT (!trafik) then do this (???)
      let marker = new window.google.maps.Marker({
        position: { lat: Number(crime.location.gps.split(',')[0]), lng: Number(crime.location.gps.split(',')[1]) },
        map: map
      });

      //test to get the date.
      let infoDate = crime.name.split(',')[0]
      let infoType = crime.name.split(',')[1]
      let infoLocation = crime.name.split(',')[2]
      let infoLocationTwo = crime.name.split(',')[3]



      //the html we send to the content option of InfoWindow()
      let infoBox = `
        <h3 style="color: black; opacity: 0.7;">${infoDate}</h3>
        <br>
        <p>${infoType}</p>
        <br>
        <p>${infoLocation}</p>
        <br>
        <p>${infoLocationTwo}</p>
      `
      let infoText = `<h3 style="color: black; opacity: 0.5;">${crime.name}</h3><br></br><h2>${crime.summary}</h2>`;
      //where we create infoWindow with settings.
      let infoWindow = new window.google.maps.InfoWindow({
        content: infoBox
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      })
    }
  }

  render() {

    return (
      <div style={this.mapStyle} id="map"></div>
    )
  }
}

const mapStateToProps = (state) => ({
  crimes: state.root.crimes
});

export default connect(mapStateToProps, null)(GmapsComponent);