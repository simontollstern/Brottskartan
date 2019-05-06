import React from 'react'
import style from './SearchFuncComponent.module.css';
import { connect } from 'react-redux';
import { useEffect } from 'react'

// returns a search function for our dashboard
function SearchFuncComponent(props) {

  // on submit we create a geocoder and sends it to our search function and prevent the page refreshing
  const preventAction = (e) => {
    e.preventDefault();
    let geocoder = new window.google.maps.Geocoder();
      if(props.stationMap) {
        geocodeAddress(geocoder, props.stationMap);
      } else if (props.crimeMap) {
        geocodeAddress(geocoder, props.crimeMap);
      }
  }


  useEffect(()=>{
    // Connects our input field with google places (countries, cities etc..)
    let searchBox = new window.google.maps.places.SearchBox(document.getElementById('input'));

    window.google.maps.event.addListener(searchBox, 'places_changed', function() {
    // Get our input fields places and place it into a a new variable
    let places = searchBox.getPlaces();

    // bound????????
    let bounds = new window.google.maps.LatLngBounds();
    let i, place;
    
    // vad är detta för for loop???????
    for(i = 0; place = places[i]; i++) {
      bounds.extend(place.geometry.location);
    }

    // If crime map is not undefined, go to the following
    if (props.crimeMap !== undefined) {
      props.crimeMap.fitBounds(bounds);
      props.crimeMap.setZoom(10);
    }

    // If crime map is not undefined, go to the following
    if (props.stationMap !== undefined) {
      props.stationMap.fitBounds(bounds);
      props.stationMap.setZoom(10);
    }

  })
  });

  // receives a geocoder and our Map(station/crime) and lets users search on given map
  function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('input').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(10);
      } else {
        // popup error window if the search was faulty
        // alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

    return (
      <div>
        <form onSubmit={preventAction}>
         <input 
          id="input" 
          className={style.search} 
          placeholder='Sök plats...' 
          type="text"
          />
         <button 
          id="submit" 
          type="submit" 
          className={style.searchButton}
          >
          Sök
          </button>
        </form>
      </div>
    )
}

// grabs our maps from our redux state
const mapStateToProps = (state) => ({
  stationMap: state.root.stationMap,
  crimeMap: state.root.crimeMap
});


export default connect(mapStateToProps, null)(SearchFuncComponent)
