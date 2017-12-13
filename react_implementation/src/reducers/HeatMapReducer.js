export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LOC_HIST':
      return {
        ...state,
        'locHist': action.payload
      };
    case 'INIT_MAP':
      return {
        ...state,
        'googlemaps': action.payload
      };
    default:
      return state;
  }
};