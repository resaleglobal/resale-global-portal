export const createReseller = params => {
  console.log(params);
  return {
    type: "CREATE_RESELLER",
    payload: { params }
  };
};

export const createResellerSuccess = () => {
  return {
    type: "CREATE_RESELLER_SUCCESS"
  };
};

export const createResellerFailure = error => {
  return {
    type: "CREATE_RESELLER_FAILURE",
    payload: { error }
  };
};

export const createConsignor = params => {
  return {
    type: "CREATE_CONSIGNOR",
    payload: { params }
  };
};

export const createConsignorSuccess = () => {
  return {
    type: "CREATE_CONSIGNOR_SUCCESS"
  };
};

export const createConsignorFailure = error => {
  return {
    type: "CREATE_CONSIGNOR_FAILURE",
    payload: { error }
  };
};
