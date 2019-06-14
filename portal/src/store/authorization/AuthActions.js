

export const submitLogin = (loginParams) => {
  return {
    type: "SUBMIT_LOGIN",
    payload: { params: loginParams }
  }
}

export const loginSuccess = (token) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { token }
  }
}

export const loginError = (error) => {
  return {
    type: "LOGIN_ERROR",
    payload: { error }
  }
}

export const submitLogout = () => {
  return {
    type: "SUBMIT_LOGOUT",
  }
}

