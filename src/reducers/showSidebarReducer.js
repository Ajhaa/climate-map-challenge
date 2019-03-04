const showSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "HIDE":
      return false;
    case "SHOW":
      return true;
    default:
      return state;
  }
}

export const hideSidebar = () => {
  return {
    type: "HIDE"
  };
}

export const showSidebar = () => {
  return {
    type: "SHOW"
  };
}

export default showSidebarReducer;