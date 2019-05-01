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

export const setCrimeMap = (crimeMap) => ({
  type: 'SET_CRIME_MAP',
  payload: crimeMap
});

export const setStationMap = (stationMap) => ({
  type: 'SET_STATION_MAP',
  payload: stationMap
});

export const setStatMap = (statMap) => ({
  type: 'SET_STAT_MAP',
  payload: statMap
});
