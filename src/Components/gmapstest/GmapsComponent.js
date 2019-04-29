import React, { Component } from 'react';
// import style from './GmapsComponent.module.css';
import { connect } from 'react-redux';

class GmapsComponent extends Component {

  map;
  markers = [];

  componentDidMount () {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3
    });
    this.renderMarkers(this.map, this.props.selectedType);
  }

  componentDidUpdate() {
    this.renderMarkers(this.map, this.props.selectedType);
  }

  mapStyle = {
    width: "100%",
    height: "100vh"
  };

  renderMarkers = (map, type) => {
    for(let marker of this.markers){
      marker.setMap(null);
    }
    for(let crime of this.props.crimes){
      // if crime type ISNT (!trafik) then do this (???)

      if(crime.type === this.props.selectedType || this.props.selectedType === 'Alla'){
        let marker = new window.google.maps.Marker({
          position: { lat: Number(crime.location.gps.split(',')[0]), lng: Number(crime.location.gps.split(',')[1]) },
          map: map
        });

        this.markers.push(marker);

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

        marker.infoWindow = infoWindow;
        let markers = this.markers;

        marker.addListener('click', function(){
          for(let m of markers){
            m.infoWindow.close();
          }
          infoWindow.open(map, marker);
        })
      }


    }
  }

  render() {

    return (
      <div style={this.mapStyle} id="map"></div>
    )
  }
}

const mapStateToProps = (state) => ({
  crimes: state.root.crimes,
  selectedType: state.root.selectedType
});

export default connect(mapStateToProps, null)(GmapsComponent);
