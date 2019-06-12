const AUTH_TOKEN = 'auth-token'

export const initialAuthState = {
  token: localStorage.getItem(AUTH_TOKEN),
  loginLoading: false,
  loginError: false,
  loginErrorMessage: ''
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
      localStorage.removeItem(AUTH_TOKEN)

      return initialAuthState

    default:
      return state
  }
}