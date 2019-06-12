export const fetchAdminUsers = () => {
  return {
    type: "FETCH_ADMIN_USERS"
  }
}

export const fetchUserSuccess = (users) => {
  return {
    type: "FETCH_ADMIN_USERS_SUCCESS",
    payload: {users}
  }
}

export const fetchUserError = (error) => {
  return {
    type: "FETCH_ADMIN_USERS_ERROR",
    payload: {error}
  }
}