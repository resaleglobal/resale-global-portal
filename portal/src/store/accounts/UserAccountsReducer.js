

export const initialUserAccountState = {
  consignors: [],
  resellers: [],
  hasPurchases: false,
  selected: {
    type: null,
    id: null
  }
}


export default (state = initialUserAccountState, action) => {

  switch (action.type) {

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        consignors: action.payload.user.consignors,
        resellers: action.payload.user.resellers
      }

    case 'SELECT_ACCOUNT':
      return {
        ...state,
        selected: action.payload.selected
      }

    default:
      return state
  }
}