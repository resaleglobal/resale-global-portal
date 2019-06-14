

export const showAdmin = (state) => {
  if (state.userAccount.selected.type === 'reseller') {
    if (state.userAccount.selected.isAdmin) {
      return true
    }
  }

  return false
}

export const showReseller = (state) => {
  return state.userAccount.selected.type === 'reseller' ? true : false
}

export const showConsignor = (state) => {
  return state.userAccount.selected.type === 'reseller' ? true : false
}

export const showBuyer = (state) => {
  return state.userAccount.hasPurchases
}

export const isNewAccount = (state) => {
  return !showAdmin(state) && !showReseller(state) && !showConsignor(state) && !showBuyer(state) ? true : false
}