export const initialResellerSectionsState = {
  all: {
    sections: [],
    loading: false,
    hasError: false,
    error: ""
  },
  create: {
    show: false,
    loading: false,
    hasError: false,
    error: ""
  },
  dropdown: {
    sections: [],
    loading: false,
    hasError: false,
    error: ""
  },
  select: []
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
        }
      };

    case "FETCH_RESELLER_SECTIONS_ERROR":
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
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
        }
      };

    case "FETCH_RESELLER_DROPDOWN_SECTIONS_ERROR":
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
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
        }
      };

    case "CREATE_RESELLER_SECTIONS_ERROR":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "SELECT_RESELLER_SECTIONS":
      return {
        ...state,
        select: [
          // If an error state exists, clear it out.
          ...state.select.filter(s => s.id !== action.payload.params.id),
          {
            id: action.payload.params.id,
            loading: true,
            hasError: false,
            error: null
          }
        ]
      };

    case "SELECT_RESELLER_SECTIONS_SUCCESS":
      return {
        ...state,
        select: state.select.filter(s => s.id !== action.payload.params.id),
        all: {
          ...state.all,
          sections: state.all.sections.map(sec => {
            if (sec.id === action.payload.params.id) {
              sec.selected = action.payload.params.selected;
            }
            return sec;
          })
        }
      };

    case "SELECT_RESELLER_SECTIONS_ERROR":
      return {
        ...state,
        select: state.select.map(s => {
          if (s.id === action.payload.params.id) {
            s = {
              ...s,
              loading: false,
              hasError: true,
              error: action.payload.error
            };
          }
          return s;
        })
      };

    default:
      return state;
  }
};
