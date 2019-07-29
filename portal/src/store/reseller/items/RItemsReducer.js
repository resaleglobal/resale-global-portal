export const initialResellerItemsState = {
  items: [],
  loading: false,
  hasError: false,
  error: "",
};

export default (state = initialResellerItemsState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_ITEMS":
      return {
        ...state,
        items: [],
        loading: true,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_ITEMS_SUCCESS":
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        userLoaded: true
      };

    case "FETCH_RESELLER_ITEMS_ERROR":
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
