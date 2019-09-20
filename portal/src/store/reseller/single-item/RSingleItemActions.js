export const fetchResellerSingleItem = params => {
  return {
    type: "FETCH_RESELLER_SINGLE_ITEM",
    payload: { params }
  };
};

export const fetchSingleItemSuccess = item => {
  return {
    type: "FETCH_RESELLER_SINGLE_ITEM_SUCCESS",
    payload: { item }
  };
};

export const fetchSingleItemError = error => {
  return {
    type: "FETCH_RESELLER_SINGLE_ITEM_ERROR",
    payload: { error }
  };
};
