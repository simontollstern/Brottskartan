import { combineReducers } from 'redux';

const initialState = {
  crimes: []
}

const root = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CRIMES':

      console.log(action.payload);

      return {
        ...state,
        crimes: [...state.crimes, ...action.payload]
      }
    default:
      return state;
  }
}

export default combineReducers({
  root
});