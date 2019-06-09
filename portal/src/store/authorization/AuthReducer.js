export const initialAuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('auth-token'),
  loginLoading: false
}


export default (state = initialAuthState, action) => {
  console.log('action')
  switch (action.type) {
    case "SUBMIT_LOGIN":
      return {
        ...state,
        loginLoading: true
      }
    default:
      return state
  }
}