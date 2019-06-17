export const initialAdminUsersState = {
  users: [],
  loading: false,
  hasError: false,
  error: ""
};

export default (state = initialAdminUsersState, action) => {
  switch (action.type) {
    case "FETCH_ADMIN_USERS":
      return {
        ...state,
        users: [],
        loadingUser: true,
        hasError: false,
        error: null
      };

    case "FETCH_ADMIN_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload.users,
        loadingUser: false,
        userLoaded: true
      };

    case "FETCH_ADMIN_USERS_ERROR":
      return {
        ...state,
        loadingUser: false,
        hasError: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
