export const fetchAdminUsers = () => {
  return {
    type: "FETCH_ADMIN_USERS"
  };
};

export const fetchUserSuccess = users => {
  return {
    type: "FETCH_ADMIN_USERS_SUCCESS",
    payload: { users }
  };
};

export const fetchUserError = error => {
  return {
    type: "FETCH_ADMIN_USERS_ERROR",
    payload: { error }
  };
};

export const showInviteUser = () => {
  return {
    type: "SHOW_INVITE_USER",
  };
};

export const submitInviteUser = (params) => {
  return {
    type: "SUBMIT_INVITE_USER",
    payload: {params}
  };
};

export const submitInviteUserSuccess = () => {
  return {
    type: "SUBMIT_INVITE_USER_SUCCESS",
  };
};

export const submitInviteUserError = error => {
  return {
    type: "SUBMIT_INVITE_USER_ERROR",
    payload: { error }
  };
};

