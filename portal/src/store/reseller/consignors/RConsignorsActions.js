export const fetchResellerConsignors = () => {
  return {
    type: "FETCH_RESELLER_CONSIGNORS"
  };
};

export const fetchConsignorsSuccess = consignors => {
  return {
    type: "FETCH_RESELLER_CONSIGNORS_SUCCESS",
    payload: { consignors }
  };
};

export const fetchConsignorsError = error => {
  return {
    type: "FETCH_RESELLER_CONSIGNORS_ERROR",
    payload: { error }
  };
};

export const showInviteConsignor = () => {
  return {
    type: "SHOW_INVITE_CONSIGNOR",
  };
};


export const submitInviteConsignor = (params) => {
  return {
    type: "SUBMIT_INVITE_CONSIGNOR",
    payload: {params}
  };
};

export const submitInviteConsignorSuccess = () => {
  return {
    type: "SUBMIT_INVITE_CONSIGNOR_SUCCESS",
  };
};

export const submitInviteConsignorError = error => {
  return {
    type: "SUBMIT_INVITE_CONSIGNOR_ERROR",
    payload: { error }
  };
};

