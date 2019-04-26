import React from 'react'
import style from './SearchFuncComponent.module.css'
import { GoogleApiWrapper } from 'google-maps-react';


function SearchFuncComponent(props) {

  // const input = document.getElementById('input');
  // const options = {
  //   types: ['(cities)'],
  //   componentRestrictions: {country: 'sv'}
  // }

  // const google = this.props.google;
  // const autocomplete = new google.maps.places.Autocomplete(input, options);

    return (
      <div>
        <input id='input' className={style.search} placeholder='Sök' type="text"/>
      </div>
    )

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTDUngu6DGdd00qppeaMUj7RhYuUfFOBI',
  language: 'sv-se'
})(SearchFuncComponent)
