import React, { Component } from 'react';
import { connect } from 'react-redux';
import gmapsSettings from './GmapsSettings.json';

class GmapsCrimesComponent extends Component {

  map;
  markers = [];

  componentDidMount () {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3,
      styles: gmapsSettings,
      disableDefaultUI: true,
      zoomControl: true
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
      if(crime.type === this.props.selectedType || this.props.selectedType === 'Alla'){
        let marker = new window.google.maps.Marker({
          position: { lat: Number(crime.location.gps.split(',')[0]), lng: Number(crime.location.gps.split(',')[1]) },
          map: map
        });

        this.markers.push(marker);

        let infoText = `<h2>${crime.summary}</h2><br><h3>${crime.name}</h3><br><p style="font-size: 17px;">Läs mer om detta brott <a style="text-decoration: none;"href="${crime.url}">här</a></p>`;
        let infoWindow = new window.google.maps.InfoWindow({
          content: infoText
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

export default connect(mapStateToProps, null)(GmapsCrimesComponent);
