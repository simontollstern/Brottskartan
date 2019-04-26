import { combineReducers } from 'redux';

const initialState = {
  crimes: [],
  selectedType: 'Alla'
}

const root = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CRIMES':
      return {
        ...state,
        crimes: [...state.crimes, ...action.payload]
      }
    case 'SET_TYPE':
      console.log(action.payload)
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
