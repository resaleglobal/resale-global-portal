export const fetchUser = () => {
  return {
    type: "FETCH_USER"
  };
};

export const fetchUserSuccess = user => {
  return {
    type: "FETCH_USER_SUCCESS",
    payload: { user }
  };
};

export const fetchUserError = error => {
  return {
    type: "FETCH_USER_ERROR",
    payload: { error }
  };
};
