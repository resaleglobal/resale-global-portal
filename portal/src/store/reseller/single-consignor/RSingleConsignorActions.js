export const fetchResellerSingleConsignor = params => {
  return {
    type: "FETCH_RESELLER_SINGLE_CONSIGNOR",
    payload: { params }
  };
};

export const fetchSingleConsignorSuccess = consignor => {
  return {
    type: "FETCH_RESELLER_SINGLE_CONSIGNOR_SUCCESS",
    payload: { consignor }
  };
};

export const fetchSingleConsignorError = error => {
  return {
    type: "FETCH_RESELLER_SINGLE_CONSIGNOR_ERROR",
    payload: { error }
  };
};
