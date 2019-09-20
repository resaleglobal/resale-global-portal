export const initialResellerSingleItemState = {
  item: null,
  loading: false,
  hasError: false,
  error: ""
};

export default (state = initialResellerSingleItemState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_SINGLE_ITEM":
      return {
        ...state,
        item: null,
        loading: true,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_SINGLE_ITEM_SUCCESS":
      return {
        ...state,
        item: action.payload.item,
        loading: false,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_SINGLE_ITEM_ERROR":
      return {
        ...state,
        item: null,
        loading: false,
        hasError: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
