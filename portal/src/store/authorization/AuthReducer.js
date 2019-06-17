export const AUTH_TOKEN = 'auth-token'

export const initialAuthState = {
  token: localStorage.getItem(AUTH_TOKEN),
  loginLoading: false,
  loginError: false,
  loginErrorMessage: '',
  logoutLoading: false
}


export default (state = initialAuthState, action) => {

  switch (action.type) {
    case "SUBMIT_LOGIN":
      return {
        ...state,
        loginError: false,
        loginErrorMessage: '',
        loginLoading: true
      }
    case "LOGIN_SUCCESS":

      localStorage.setItem(AUTH_TOKEN, action.payload.token)

      return {
        ...state,
        token: action.payload.token,
        loginLoading: false
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: true,
        loginErrorMessage: action.payload.error,
        loginLoading: false,
      }
    
    case "SUBMIT_LOGOUT":
      return {
        ...state,
        logoutLoading: true
      }

    default:
      return state
  }
}