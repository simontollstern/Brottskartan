import { combineReducers } from 'redux';

const initialState = {
  crimes: [],
  stations: []
  selectedType: 'Alla'
}

const root = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CRIMES':
      return {
        ...state,
        crimes: [...state.crimes, ...action.payload]
      }
      case 'GET_STATIONS': 
      return {
        ...state,
        stations: [...state.stations, ...action.payload]
      }
      case 'SET_TYPE':
      return {
        ...state,
        selectedType: action.payload
      }
    default:
      return state;
  }
}


export default combineReducers({
  root
});
