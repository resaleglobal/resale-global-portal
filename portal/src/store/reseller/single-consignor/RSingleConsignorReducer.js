export const initialResellerSingleConsignorState = {
  consignor: null,
  loading: false,
  hasError: false,
  error: ""
};

export default (state = initialResellerSingleConsignorState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_SINGLE_CONSIGNOR":
      return {
        ...state,
        consignor: null,
        loading: true,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_SINGLE_CONSIGNOR_SUCCESS":
      return {
        ...state,
        consignor: action.payload.consignor,
        loading: false,
        hasError: false,
        error: null
      };

    case "FETCH_RESELLER_SINGLE_CONSIGNOR_ERROR":
      return {
        ...state,
        consignor: null,
        loading: false,
        hasError: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
