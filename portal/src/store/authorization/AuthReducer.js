export const initialAuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('auth-token')
}


export default (state = initialAuthState, action) => {
  switch (action.type) {
    default:
      return state
  }
}