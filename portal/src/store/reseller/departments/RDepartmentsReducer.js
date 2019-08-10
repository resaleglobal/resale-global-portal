export const initialResellerDepartmentsState = {
  all: {
    departments: [],
    loading: false,
    hasError: false,
    error: ""
  },
  create: {
    show: false,
    loading: false,
    hasError: false,
    error: ""
  }
};

export default (state = initialResellerDepartmentsState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_DEPARTMENTS":
      return {
        ...state,
        all: {
          ...state.all,
          departments: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        all: {
          ...state.all,
          departments: action.payload.departments,
          loading: false,
          userLoaded: true
        }
      };

    case "FETCH_RESELLER_DEPARTMENTS_ERROR":
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "SHOW_RESELLER_DEPARTMENTS":
      return {
        ...state,
        create: {
          ...state.create,
          show: true
        }
      };

    case "HIDE_RESELLER_DEPARTMENTS":
      return {
        ...state,
        create: {
          ...state.create,
          show: false
        }
      };

    case "CREATE_RESELLER_DEPARTMENTS":
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "CREATE_RESELLER_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        create: {
          ...state.create,
          show: false,
          loading: false
        }
      };

    case "CREATE_RESELLER_DEPARTMENTS_ERROR":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
};
