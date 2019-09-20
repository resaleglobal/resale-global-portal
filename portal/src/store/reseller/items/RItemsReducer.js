export const initialResellerItemsState = {
  items: [],
  loading: false,
  hasError: false,
  error: "",
  create: {
    loading: false,
    hasError: false,
    error: "",
    finished: false,
    createAnotherParams: {}
  }
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

    case "CLEAR_RESELLER_ITEMS":
      return {
        ...state,
        create: {
          ...state.create,
          finished: false,
          createAnotherParams: {}
        }
      };

    case "CREATE_RESELLER_ITEMS":
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          hasError: false,
          finished: false,
          createAnotherParams: {},
          error: null
        }
      };

    case "CREATE_RESELLER_ITEMS_SUCCESS":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: false,
          error: null,
          finished: true,
          createAnotherParams: action.payload.params
        }
      };

    case "CREATE_RESELLER_ITEMS_ERROR":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: true,
          error: action.payload.error,
          finished: false,
          createAnotherParams: {}
        }
      };

    default:
      return state;
  }
};
