export default (state = {}, action) => {
  switch (action.type) {
    case "POST_TWEETS":
      return {
        ...state
      };
    case "LOAD_TWEETS":
      return {
        ...state
      };
    default:
      return state;
  }
};