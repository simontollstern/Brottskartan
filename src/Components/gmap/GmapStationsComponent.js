import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../googleMaps.css';
import style from './GmapStationsComponent.module.css';

class GmapStationsComponent extends Component {
  map;
  markers = [];

  componentDidMount(){
    this.map = new window.google.maps.Map(document.getElementById('map'),{
      center: { lat: 62.8, lng: 17.5671981 },
      zoom: 5.3
    });
    this.renderMarkers(this.map);
  }


  renderMarkers = (map) => {


    for(let station of this.props.stations){
      let marker = new window.google.maps.Marker({
        position: { lat: Number(station.location.gps.split(',')[0]), lng: Number(station.location.gps.split(',')[1]) },
        map: map
      });

      this.markers.push(marker);

      let services = "";

      for(let service of station.services) {
        services += '<li>' + service.name + '</li>';
      }

       let infoText =
        `<div class="flextest">
          <h2>
            Polisstation:&nbsp;<h2 class="bold">${station.name}</h2>
          </h2>
        </div>

        <br>
        <hr>
        <br>

        <h2>
          Dessa ärenden hanteras här:
        </h2>

        <br>

        <ul class="ulStyle">
          ${services}
        </ul>

        <br>

        <h3>
          Address: ${station.location.name}
        </h3>

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

      marker.addListener('click', function(){
        for(let m of markers){
          m.infoWindow.close();
        }
        infoWindow.open(map, marker);
      })
    }
  }


  render() {
    return (
      <div>
        <div className={style.map} id='map'>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: state.root.stations
});

export default connect(mapStateToProps, null)(GmapStationsComponent);
