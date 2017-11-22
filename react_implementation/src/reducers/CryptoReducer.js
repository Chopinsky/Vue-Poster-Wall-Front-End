const initState = {
  isFetching: false,
  data: null,
  hasError: false,
  errorMessage: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_COIN_DATA":
      return {
        ...state,
        ...initState,
        isFetching: true
      };

    case "FETCH_COIN_DATA_SUCCESS":
      return {
        ...state,
        ...initState,
        data: action.payload
      };

    case "FETCH_COIN_DATA_FAILURE":
      return {
        ...state,
        ...initState,
        hasError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};