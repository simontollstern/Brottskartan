import React from 'react'
import style from './SearchFuncComponent.module.css';
import { connect } from 'react-redux';

function SearchFuncComponent(props) {
  const preventAction = (e) => {
    e.preventDefault();
  }

  setTimeout(()=>{
    // Connects our input field with google places (countries, cities etc..)
    let searchBox = new window.google.maps.places.SearchBox(document.getElementById('input'));

    window.google.maps.event.addListener(searchBox, 'places_changed', function() {
    // Get our input fields places and place it into a a new variable
    let places = searchBox.getPlaces();

    // bound
    let bounds = new window.google.maps.LatLngBounds();
    let i, place;

    for(i = 0; place = places[i]; i++) {
      bounds.extend(place.geometry.location);
    }

    // If props.stationMap !== undefined you can search on police stations, otherwise you can search for crimes
    if (props.stationMap !== undefined) {
    // Reaches the station map from Redux
    props.stationMap.fitBounds(bounds);
    props.stationMap.setZoom(12);

    let geocoder = new window.google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, props.stationMap);
  });
  }

  if (props.crimeMap !== undefined){
    // Reaches the crime map from Redux
    props.crimeMap.fitBounds(bounds);
    props.crimeMap.setZoom(12);

    let geocoder = new window.google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
    console.log('Clicked')
    geocodeAddress(geocoder, props.crimeMap);
  });
  }

  })
  },  0);

  function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('input').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

    return (
      <div>
        <form onSubmit={preventAction}>
         <input id="input" className={style.search} placeholder='Sök' type="text"/>
         <button id="submit" type="submit" className={style.searchButton}>Sök</button>
        </form>
      </div>
    )
}

const mapStateToProps = (state) => ({
  stationMap: state.root.stationMap,
  crimeMap: state.root.crimeMap
});

export default connect(mapStateToProps, null)(SearchFuncComponent)
