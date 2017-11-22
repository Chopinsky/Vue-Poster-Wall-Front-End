export default (state = {}, action) => {
  switch (action.type) {
    case "CHAR_BELOW_TWENTY":
      return {
        ...state,
        charCntClass: "lessThanTwenty"
      };
    case "CHAR_BELOW_TEN":
      return {
        ...state,
        charCntClass: "lessThanTen"
      }
    default:
      return state;
  }
};