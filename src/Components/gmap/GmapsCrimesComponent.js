import React, { Component } from 'react';
import { connect } from 'react-redux';
import gmapsSettings from './GmapsSettings.json';
import { setCrimeMap } from '../../Redux/actions';

// Component containing the map that displays crimes
class GmapsCrimesComponent extends Component {

  // Defining variables (use this. to access them)
  map;
  markers = [];
  markerCluster;
  mapMarkers = [];
  infoText = "";

  componentDidMount () {
    // Create the map and assign some settings
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3,
      styles: gmapsSettings,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    });
    this.props.setCrimeMap(this.map);

    // Render markers on map
    this.renderMarkers(this.map, this.props.selectedType);
  }

  componentDidUpdate() {
    this.renderMarkers(this.map, this.props.selectedType);
  }

  // Some CSS for the map
  mapStyle = {
    width: "100%",
    height: "100vh"
  };

  // Big function - feel free to split into smaller ones
  renderMarkers = (map, type) => {
    // Loop through all markers and remove them from the map
    for(let marker of this.mapMarkers){
      marker.setMap(null);
    }

    this.markers = [];
    this.mapMarkers = [];

    // Loop through crimes aquired from the API..
    for(let crime of this.props.crimes){
      // ..if there already exists a crime with the same lat/lng in the marker array..
      if(!this.markers.some(e => e.location.lat === crime.coords_lat && e.location.lng === crime.coords_lng)){
        // ..add a new object to the array..
        this.markers.push({
          location: {
            lat: crime.coords_lat,
            lng: crime.coords_lng
          },
          crimes: [
            crime
          ]
        });
      }else{
        // ..otherwise add the crime to the crime array of the object with the same lat/lng
        for(let marker of this.markers){
          if(marker.location.lat === crime.coords_lat && marker.location.lng === crime.coords_lng){
            marker.crimes.push(crime);
          }
        }
      }
    }

    // Loop through the newly created array of markers
    for(let marker of this.markers){
      this.infoText = [];
      if (this.props.selectedType === 'Alla') {
        for(let crime of marker.crimes){
          this.infoText += `<div class="infoWindowCss"><h3>${crime.name}</h3><br><h2>${crime.summary}</h2><br><p style="font-size: 16px;">Läs mer om detta brott <a style="text-decoration: none;" target="_blank" href="${crime.url}">här</a></p><br></div>`;
        }
        this.mapMarkers.push(new window.google.maps.Marker({
          position: { lat: marker.location.lat, lng: marker.location.lng },
          map: map,
          label: {
            text: marker.crimes.length.toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          infoWindow: new window.google.maps.InfoWindow({
              content: this.infoText
          }),
          opened: false
        }));
      } else if (marker.crimes.some(e => e.type === this.props.selectedType)){
        let temp = marker.crimes.filter(crime => {
            return crime.type === this.props.selectedType
        })
        for(let crime of temp) {
          this.infoText += `<div class="infoWindowCss"><h3>${crime.name}</h3><br><h2>${crime.summary}</h2><br><p style="font-size: 16px;">Läs mer om detta brott <a style="text-decoration: none;" target="_blank" href="${crime.url}">här</a></p><br></div>`;
        }
        this.mapMarkers.push(new window.google.maps.Marker({
          position: { lat: marker.location.lat, lng: marker.location.lng },
          map: map,
          label: {
            text: marker.crimes.filter(marker => {
             return marker.type === this.props.selectedType
            }).length.toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          infoWindow: new window.google.maps.InfoWindow({
              content: this.infoText
          })
        }));
      }
    }

    for(let marker of this.mapMarkers){
      let markers = this.mapMarkers;

      marker.addListener('click', function(){
        map.panTo(marker.position);
        map.setZoom(8);

        for(let m of markers){
          m.infoWindow.close();
        }

        marker.opened = !marker.opened;

        marker.opened ? marker.infoWindow.open(map, marker) : marker.infoWindow.close();
      })
    }
    // var markerOptions = {
    //   imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    // }
    // let markerCluster = new window.MarkerClusterer(this.map, this.mapMarkers, markerOptions);

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

const mapDispatchToProps = (dispatch) => ({
  setCrimeMap: (map) => dispatch(setCrimeMap(map))
})

export default connect(mapStateToProps, mapDispatchToProps)(GmapsCrimesComponent);
