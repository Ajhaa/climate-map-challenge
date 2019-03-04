const selectedReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.value;
    default:
      return state;
  }
}

export const changeSelected = value => {
  return {
    type: 'SET_SELECTED',
    value
  }
}

export default selectedReducer;