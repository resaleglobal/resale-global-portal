export const initialResellerSectionsState = {
  all: {
    sections: [],
    loading: false,
    hasError: false,
    error: "",
  },
  create: {
    show: false,
    loading: false,
    hasError: false,
    error: "",
  },
  dropdown: {
    sections: [],
    loading: false,
    hasError: false,
    error: "",
  }
};

export default (state = initialResellerSectionsState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_SECTIONS":
      return {
        ...state,
        all: {
          ...state.all,
          sections: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_SECTIONS_SUCCESS":
      return {
        ...state,
        all: {
          ...state.all,
          sections: action.payload.sections,
          loading: false,
          userLoaded: true
        },
      };

    case "FETCH_RESELLER_SECTIONS_ERROR":
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          hasError: true,
          error: action.payload.error
        },
      };

    case "CLEAR_RESELLER_DROPDOWN_SECTIONS":
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          sections: [],
          loading: false,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_DROPDOWN_SECTIONS":
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          sections: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_DROPDOWN_SECTIONS_SUCCESS":
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          sections: action.payload.sections,
          loading: false,
          userLoaded: true
        },
      };

    case "FETCH_RESELLER_DROPDOWN_SECTIONS_ERROR":
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          loading: false,
          hasError: true,
          error: action.payload.error
        },
      };

    case "SHOW_RESELLER_SECTIONS":
      return {
        ...state,
        create: {
          ...state.create,
          show: true
        }
      };

    case "HIDE_RESELLER_SECTIONS":
      return {
        ...state,
        create: {
          ...state.create,
          show: false
        }
      };

    case "CREATE_RESELLER_SECTIONS":
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "CREATE_RESELLER_SECTIONS_SUCCESS":
      return {
        ...state,
        create: {
          ...state.create,
          show: false,
          loading: false,
          userLoaded: true
        },
      };

    case "CREATE_RESELLER_SECTIONS_ERROR":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: true,
          error: action.payload.error
        },
      };

    default:
      return state;
  }
};
