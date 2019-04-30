import React, { Component } from 'react';
import { connect } from 'react-redux';
import gmapsSettings from './GmapsSettings.json';

// Component containing the map that displays crimes
class GmapsCrimesComponent extends Component {

  // Defining variables (use this. to access them)
  map;
  markers = [];

  componentDidMount () {
    // Create the map and assign some settings
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3,
      styles: gmapsSettings
    });

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
    for(let marker of this.markers){
      marker.setMap(null);
    }

    // Loop through crimes aquired from the API..
    for(let crime of this.props.crimes){
      // ..if there already exists a crime with the same lat/lng in the marker array..
      if(!this.markers.some(e => e.location.lat === Number(crime.location.gps.split(',')[0]) && e.location.lng === Number(crime.location.gps.split(',')[1]))){
        // ..add a new object to the array..
        this.markers.push({
          location: {
            lat: Number(crime.location.gps.split(',')[0]),
            lng: Number(crime.location.gps.split(',')[1])
          },
          crimes: [
            crime
          ]
        });
      }else{
        // ..otherwise add the crime to the crime array of the object with the same lat/lng
        for(let marker of this.markers){
          if(marker.location.lat === Number(crime.location.gps.split(',')[0]) && marker.location.lng === Number(crime.location.gps.split(',')[1])){
            marker.crimes.push(crime);
          }
        }
      }
    }

    console.log(this.markers);


    // Loop through the newly created array of markers
    for(let marker of this.markers){

        let infoText = `<h2>${crime.summary}</h2><br><h3>${crime.name}</h3><br><p style="font-size: 20px;">Läs mer om detta brott <a style="text-decoration: none;"href="${crime.url}">här</a></p>`;
        let infoWindow = new window.google.maps.InfoWindow({
          content: infoText
        });


      // _________________________________________________
      // Here's where it gets a bit tricky:
      // Below, the markers are created from the marker objects (with their
      // crime count as labels). The if statement that filters markers depending
      // on what type is selected has been commented out because it needs to
      // be modified to work. Same goes for the event listener added to markers.
      //
      // Feel free to modify anything to make it work :)
      // __________________________________________________

      //if(marker.crimes.type === this.props.selectedType || this.props.selectedType === 'Alla'){

          new window.google.maps.Marker({
            position: { lat: marker.location.lat, lng: marker.location.lng },
            map: map,
            label: {
              text: marker.crimes.length.toString(),
              color: 'white',
              fontWeight: 'bold'
            }
          });

          let infoText = "";

          for(let crime of marker.crimes){
            infoText += `<h3>${crime.name}</h3><br><h2>${crime.summary}</h2><br>`
          }

        marker.infoWindow = new window.google.maps.InfoWindow({
          content: infoText
        });

        // let markers = this.markers;
        //
        // marker.addListener('click', function(){
        //   for(let m of markers){
        //     m.infoWindow.close();
        //   }
        //   infoWindow.open(map, marker);
        // })
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
