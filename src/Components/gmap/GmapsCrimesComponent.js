import React, { Component } from 'react';
import { connect } from 'react-redux';

class GmapsCrimesComponent extends Component {

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
    for(let crime of this.props.crimes){
      // if crime type ISNT (!trafik) then do this (???)
      let marker = new window.google.maps.Marker({
        position: { lat: Number(crime.location.gps.split(',')[0]), lng: Number(crime.location.gps.split(',')[1]) },
        map: map
      });

      let infoText = `<h3 style="color: black; opacity: 0.5;">
                        ${crime.name}</h3>
                        <br></br>
                        <h2>${crime.summary}</h2>`;
      //where we create infoWindow with settings.
      let infoWindow = new window.google.maps.InfoWindow({
        content: infoText
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

export default connect(mapStateToProps, null)(GmapsCrimesComponent);
