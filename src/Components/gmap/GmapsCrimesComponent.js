import React, { Component } from 'react';
import { connect } from 'react-redux';
import gmapsSettings from './GmapsSettings.json';
import { setCrimeMap } from '../../Redux/actions';

// Component containing the map that displays crimes
class GmapsCrimesComponent extends Component {

  // Defining variables (use this. to access them)
  map;
  crimePositions = [];
  markers = [];
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

  //when update run function
  componentDidUpdate() {
    this.renderMarkers(this.map, this.props.selectedType);
  }

  // Big function - feel free to split into smaller ones
  renderMarkers = (map, type) => {
    // Loop through all markers and remove them from the map
    for(let marker of this.markers){
      marker.setMap(null);
    }

    this.crimePositions = [];
    this.markers = [];

    // Loop through crimes aquired from the API..
    for(let crime of this.props.crimes){
      // ..if there already exists a crime with the same lat/lng in the position array..
      if(!this.crimePositions.some(
        e => e.location.lat === crime.coords_lat &&
          e.location.lng === crime.coords_lng)){
        // ..add a new object to the array..
        this.crimePositions.push({
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
        for(let position of this.crimePositions){
          if(position.location.lat === crime.coords_lat &&
            position.location.lng === crime.coords_lng){
            position.crimes.push(crime);
          }
        }
      }
    }

    // Loop through the newly created array of markers
    for(let position of this.crimePositions){
      this.infoText = [];
      if (this.props.selectedType === 'Alla') {
        //loops through the markers of crimes and give them an infoTextbox
        for(let crime of position.crimes){

          this.infoText +=
            `<div class="infoWindowCss">
                <h3>${crime.name}</h3>
                <br>
                <h2>${crime.summary}</h2>
                <br>
                <p style="font-size: 16px;">
                Läs mer om detta brott
                <a style="text-decoration: none;" target="_blank" href="${crime.url}">
                  här
                </a>
                </p><br>
            </div>`;
        }
        this.markers.push(new window.google.maps.Marker({
          position: {
            lat: position.location.lat,
            lng: position.location.lng
          },
          map: map,
          label: {
            text: position.crimes.length.toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          infoWindow: new window.google.maps.InfoWindow({
              content: this.infoText
          }),
          opened: false
        }));
      } else if (position.crimes.some(e => e.type === this.props.selectedType)){

        let selectedCrimes = position.crimes.filter(crime => crime.type === this.props.selectedType)

        for(let crime of selectedCrimes) {
          this.infoText +=
          `<div class="infoWindowCss">
              <h3>${crime.name}</h3>
              <br>
              <h2>${crime.summary}</h2><br>
              <p style="font-size: 16px;">
                Läs mer om detta brott
                <a
                style="text-decoration: none;"
                target="_blank" href="${crime.url}">
                här
                </a>
              </p>
              <br>
          </div>`;
        }
        this.markers.push(new window.google.maps.Marker({
          position: {
            lat: position.location.lat,
            lng: position.location.lng
          },
          map: map,
          label: {
            text: position.crimes.filter(marker =>
              marker.type === this.props.selectedType
            ).length.toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          infoWindow: new window.google.maps.InfoWindow({
              content: this.infoText
          })
        }));
      }
    }

    //loops through the all markers and adds click function to it, and some settings for google api
    for(let marker of this.markers){
      let markers = this.markers;

      marker.addListener('click', function(){
        map.panTo(marker.position);
        map.setZoom(8);

        //checks if the marker is open and close it
        for(let m of markers){
          if(m !== marker){
            m.opened = false;
            m.infoWindow.close();
          }
        }

        marker.opened = !marker.opened;

        marker.opened ? marker.infoWindow.open(map, marker) : marker.infoWindow.close();
      })
    }
  }

  render() {

    return (
      <div className='map' id="map"></div>
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
