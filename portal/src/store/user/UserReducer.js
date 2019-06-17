export const initialUserState = {
  userLoaded: false, // Reflects whether the initial user call has completed.
  loadingUser: false,
  hasError: false,
  error: null,
  profile: "",
  email: "",
  name: ""
};

export default (state = initialUserState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        loadingUser: true,
        hasError: false,
        error: null
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loadingUser: false,
        userLoaded: true
      };

    case "FETCH_USER_ERROR":
      return {
        ...state,
        loadingUser: false,
        hasError: true,
        userLoaded: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
