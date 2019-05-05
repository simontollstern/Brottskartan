import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../googleMaps.css';
import { setStationMap } from '../../Redux/actions';
import gmapsSettings from './GmapsSettings.json'

// render stations to the station screen 
class GmapStationsComponent extends Component {
  map;
  markers = [];

  // sets a new map when component mounts 
  componentDidMount(){
    this.map = new window.google.maps.Map(document.getElementById('map'),{
      center: { 
        lat: 62.8, 
        lng: 17.5671981 
      },
      zoom: 5.3,
      styles: gmapsSettings,
      disableDefaultUI: true,
      zoomControl:true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    });
    this.props.setStationMap(this.map);
    this.renderMarkers(this.map);
  }

// adds markers to out map
  renderMarkers = (map) => {

    // grabs one obejct of array and give tem a marker
    for(let station of this.props.stations){
      let marker = new window.google.maps.Marker({
        position: {
          lat: Number(station.location.gps.split(',')[0]), 
          lng: Number(station.location.gps.split(',')[1]) 
        },
        map: map
      });

      this.markers.push(marker);

      let services = "";
      // loops through the object of station.services and sets the services of each station 
      for(let service of station.services) {
        services += '<li>' + service.name + '</li>';
      }

       let infoText =
        `<div class="flex">
          <h2>Polisstation:&nbsp;
            <h2 class="bold">${station.name}</h2>
          </h2>
        </div>
        <br>
        <hr>
        <br>
        <h2>Dessa ärenden hanteras här:</h2>
        <br>
        <ul class="ulStyle">
          ${services}
        </ul>
        <br>
        <h3>Address: ${station.location.name}</h3>
        <br>
        Mer information om Polisstationen i ${station.name}:
        <a href="${station.Url}" target='_blank'>
        Klicka här
        </a>`;

      let infoWindow = new window.google.maps.InfoWindow({
        content: infoText
      });

      marker.infoWindow = infoWindow;
      let markers = this.markers;

      // adds listener to each station marker 
      marker.addListener('click', function(){
        // closes one infoWindow if another marker is clicked
        for(let m of markers){
          m.infoWindow.close();
        }
        infoWindow.open(map, marker);
      })
    }
  }
  // when our state changes we update the map with our markers
  componentDidUpdate(){
    this.renderMarkers(this.map);
  }

  render() {
    return (
      <div>
        <div className='map' id='map'>

        </div>
      </div>
    )
  }
}

// grabs our stations from redux state
const mapStateToProps = (state) => ({
  stations: state.root.stations
});

// grabs a function from our redux store
const mapDispatchToProps = (dispatch) => ({
  setStationMap: (map) => dispatch(setStationMap(map))
})

export default connect(mapStateToProps, mapDispatchToProps)(GmapStationsComponent);
