import React from 'react'
import style from './SearchFuncComponent.module.css';
import { connect } from 'react-redux';

function SearchFuncComponent(props) {

  const preventAction = (e) => {
    e.preventDefault();
    let geocoder = new window.google.maps.Geocoder();
      if(props.stationMap) {
        geocodeAddress(geocoder, props.stationMap);
      } else if (props.crimeMap) {
        geocodeAddress(geocoder, props.crimeMap);
      }
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
  })
  },  0);

  function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('input').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(10);
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
