export const initialAdminUsersState = {
  users: [],
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

export default (state = initialAdminUsersState, action) => {
  switch (action.type) {
    case "FETCH_ADMIN_USERS":
      return {
        ...state,
        users: [],
        loading: true,
        hasError: false,
        error: null
      };

    case "FETCH_ADMIN_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        userLoaded: true
      };

    case "FETCH_ADMIN_USERS_ERROR":
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload.error
      };

    case "SHOW_INVITE_USER":
        return {
          ...state,
          invite: {
            ...state.invite,
            show: true
          }
        };

    case "SUBMIT_INVITE_USER":
      return {
        ...state,
        invite: {
          ...state.invite,
          loading: true,
          hasError: false,
          error: null
        }
      };

    case "SUBMIT_INVITE_USER_SUCCESS":
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

    case "SUBMIT_INVITE_USER_ERROR":
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
