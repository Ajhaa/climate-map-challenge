const comparedReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_COMPARED':
        return action.value;
      default:
        return state;
    }
}

export const changeCompared = (value) => {
  return {
    type: 'SET_COMPARED',
    value
  };
}


export default comparedReducer;