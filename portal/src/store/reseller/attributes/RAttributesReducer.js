export const initialResellerAttributesState = {
  all: {
    attributes: [],
    loading: false,
    hasError: false,
    error: "",
  },
};

export default (state = initialResellerAttributesState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_ATTRIBUTES":
      return {
        ...state,
        all: {
          ...state.all,
          attributes: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_ATTRIBUTES_SUCCESS":
      return {
        ...state,
        all: {
          ...state.all,
          attributes: action.payload.attributes,
          loading: false,
          userLoaded: true
        },
      };

    case "FETCH_RESELLER_ATTRIBUTES_ERROR":
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          hasError: true,
          error: action.payload.error
        },
      };

    default:
      return state;
  }
};
