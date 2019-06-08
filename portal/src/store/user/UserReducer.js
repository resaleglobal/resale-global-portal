

export const initialUserState = {
  isAdmin: true,
  isReseller: true,
  isConsignor: true,
  isBuyer: true,
  organization: ''
}


export default (state = initialUserState, action) => {
  switch (action.type) {
    default:
      return state
  }
}