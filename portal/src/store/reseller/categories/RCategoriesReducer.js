export const initialResellerCategoriesState = {
  all: {
    categories: [],
    loading: false,
    hasError: false,
    error: ""
  },
  selected: {
    categories: [],
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
  attributes: {
    category: {},
    attributes: [],
    loading: false,
    hasError: false,
    error: ""
  },
  select: []
};

export default (state = initialResellerCategoriesState, action) => {
  switch (action.type) {
    case "FETCH_RESELLER_CATEGORIES":
      return {
        ...state,
        all: {
          ...state.all,
          categories: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_CATEGORIES_SUCCESS":
      return {
        ...state,
        all: {
          ...state.all,
          categories: action.payload.categories,
          loading: false,
          userLoaded: true
        }
      };

    case "FETCH_RESELLER_CATEGORIES_ERROR":
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "FETCH_RESELLER_SELECTED_CATEGORIES":
      return {
        ...state,
        selected: {
          ...state.selected,
          categories: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_SELECTED_CATEGORIES_SUCCESS":
      return {
        ...state,
        selected: {
          ...state.selected,
          categories: action.payload.categories,
          loading: false,
          userLoaded: true
        }
      };

    case "FETCH_RESELLER_SELECTED_CATEGORIES_ERROR":
      return {
        ...state,
        selected: {
          ...state.selected,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "SHOW_RESELLER_CATEGORIES":
      return {
        ...state,
        create: {
          ...state.create,
          show: true
        }
      };

    case "HIDE_RESELLER_CATEGORIES":
      return {
        ...state,
        create: {
          ...state.create,
          show: false
        }
      };

    case "CREATE_RESELLER_CATEGORIES":
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "CREATE_RESELLER_CATEGORIES_SUCCESS":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          show: false
        }
      };

    case "CREATE_RESELLER_CATEGORIES_ERROR":
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "FETCH_RESELLER_SELECTED_ATTRIBUTES":
      return {
        ...state,
        attributes: {
          ...state.attributes,
          attributes: [],
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "FETCH_RESELLER_SELECTED_ATTRIBUTES_SUCCESS":
      return {
        ...state,
        attributes: {
          ...state.attributes,
          attributes: action.payload.attributes,
          loading: false,
          userLoaded: true
        }
      };

    case "FETCH_RESELLER_SELECTED_ATTRIBUTES_ERROR":
      return {
        ...state,
        attributes: {
          ...state.attributes,
          loading: false,
          hasError: true,
          error: action.payload.error
        }
      };

    case "SELECT_RESELLER_CATEGORIES":
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

    case "SELECT_RESELLER_CATEGORIES_SUCCESS":
      return {
        ...state,
        select: state.select.filter(s => s.id !== action.payload.params.id),
        all: {
          ...state.all,
          categories: state.all.categories.map(cat => {
            if (cat.id === action.payload.params.id) {
              cat.selected = action.payload.params.selected;
            }
            return cat;
          })
        }
      };

    case "SELECT_RESELLER_CATEGORIES_ERROR":
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
