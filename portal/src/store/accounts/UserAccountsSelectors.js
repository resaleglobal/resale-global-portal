export const showAdmin = state => {
  if (state.userAccount.selected.type === "RESELLER") {
    return state.userAccount.selected.isAdmin;
  }

  return false;
};

export const showReseller = state => {
  return state.userAccount.selected.type === "RESELLER";
};

export const showConsignor = state => {
  return state.userAccount.selected.type === "CONSIGNOR";
};

export const showBuyer = state => {
  return state.userAccount.hasPurchases;
};

export const isNewAccount = state => {
  const newAccountChecks = [
    state.userAccount.consignors.length === 0,
    state.userAccount.resellers.length === 0
  ];

  return newAccountChecks.every(check => check);
};

export const isAccountSelected = state => {
  return state.userAccount.selected.id !== null;
};

export const getValidDomains = state => {
  return [
    ...state.userAccount.consignors.map(c => c.domain).filter(c => c),
    ...state.userAccount.resellers.map(c => c.domain).filter(c => c)
  ];
};
