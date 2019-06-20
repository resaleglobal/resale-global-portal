export const initialUserAccountState = {
  userLoaded: false,
  consignors: [],
  resellers: [],
  hasPurchases: false,
  createReseller: {
    loading: false,
    hasError: false,
    error: null
  },
  createConsignor: {
    loading: false,
    hasError: false,
    error: null
  },
  selected: {
    type: null,
    id: null,
    domain: null,
    isAdmin: false
  }
};

export default (state = initialUserAccountState, action) => {
  switch (action.type) {
    case "SELECT_ACCOUNT":
      return {
        ...state,
        selected: {
          ...state.selected,
          type: action.payload.params.type,
          id: action.payload.params.id,
          domain: action.payload.params.domain,
          isAdmin: action.payload.params.isAdmin
        }
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        consignors: action.payload.user.consignors,
        resellers: action.payload.user.resellers,
        userLoaded: true
      };

    case "FETCH_USER_ERROR":
      return {
        ...state,
        userLoaded: true
      };

    case "CREATE_RESELLER":
      return {
        ...state,
        createReseller: {
          ...state.createReseller,
          hasError: false,
          loading: true,
          error: null
        }
      };

    case "CREATE_RESELLER_SUCCESS":
      return {
        ...state,
        createReseller: {
          ...state.createReseller,
          loading: false
        }
      };

    case "CREATE_RESELLER_FAILURE":
      return {
        ...state,
        createReseller: {
          ...state.createReseller,
          hasError: true,
          loading: false,
          error: action.payload.error
        }
      };

    case "CREATE_CONSIGNOR":
      return {
        ...state,
        createConsignor: {
          ...state.createConsignor,
          hasError: false,
          loading: true,
          error: null
        }
      };

    case "CREATE_CONSIGNOR_SUCCESS":
      return {
        ...state,
        createConsignor: {
          ...state.createConsignor,
          loading: false
        }
      };

    case "CREATE_CONSIGNOR_FAILURE":
      return {
        ...state,
        createConsignor: {
          ...state.createConsignor,
          hasError: true,
          loading: false,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
};
