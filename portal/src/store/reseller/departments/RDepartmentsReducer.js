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
  },
  select: []
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

    case "SELECT_RESELLER_DEPARTMENTS":
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

    case "SELECT_RESELLER_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        select: state.select.filter(s => s.id !== action.payload.params.id),
        all: {
          ...state.all,
          departments: state.all.departments.map(dep => {
            if (dep.id === action.payload.params.id) {
              dep.selected = action.payload.params.selected;
            }
            return dep;
          })
        }
      };

    case "SELECT_RESELLER_DEPARTMENTS_ERROR":
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
