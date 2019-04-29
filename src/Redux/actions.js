export const getCrimes = (crime) => ({
  type: 'GET_CRIMES',
  payload: crime
});

export const getStations = (station) => ({
  type: 'GET_STATIONS',
  payload: station
});

export const setType = (type) => ({
  type: 'SET_TYPE',
  payload: type
});
