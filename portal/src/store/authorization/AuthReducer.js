export const initialAuthState = {
  token: localStorage.getItem('auth-token'),
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
    default:
      return state
  }
}