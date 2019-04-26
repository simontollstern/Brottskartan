export const getCrimes = (crime) => ({
  type: 'GET_CRIMES',
  payload: crime
});

export const setType = (type) => ({
  type: 'SET_TYPE',
  payload: type
});
