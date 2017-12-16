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
    case 'EARTHQUAKE':
      return {
        ...state,
        'earthquake': action.payload,
        'earthquake_meta': action.meta
      }
    default:
      return state;
  }
};