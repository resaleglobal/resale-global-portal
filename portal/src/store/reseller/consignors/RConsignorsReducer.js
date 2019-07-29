export const initialResellerConsignorsState = {
  consignors: [],
  loading: false,
  hasError: false,
  error: "",
  invite: {
    loading: false,
    hasError: false,
    error: "",
    show: false,
  }
};

export default (state = initialResellerConsignorsState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_CONSIGNORS":
      return {
        ...state,
        consignors: [],
        loading: true,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_CONSIGNORS_SUCCESS":
      return {
        ...state,
        consignors: action.payload.consignors,
        loading: false,
        userLoaded: true
      };

    case "FETCH_RESELLER_CONSIGNORS_ERROR":
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload.error
      };

    case "SHOW_INVITE_CONSIGNOR":
        return {
          ...state,
          invite: {
            ...state.invite,
            show: true
          }
        };

    case "SUBMIT_INVITE_CONSIGNOR":
      return {
        ...state,
        invite: {
          ...state.invite,
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "SUBMIT_INVITE_CONSIGNOR_SUCCESS":
      return {
        ...state,
        invite: {
          ...state.invite,
          loading: false,
          hasError: false,
          error: null,
          show: false
        }
      };

    case "SUBMIT_INVITE_CONSIGNOR_ERROR":
      return {
        ...state,
        invite: {
          ...state.invite,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
};
