const locationsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_LOCATIONS':
      return action.value;
    default:
      return state;
  }
}

export const setLocations = value => {
  return {
    type: 'SET_LOCATIONS',
    value
  }
}

export default locationsReducer;