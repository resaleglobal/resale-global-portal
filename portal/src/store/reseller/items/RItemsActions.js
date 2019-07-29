export const fetchResellerItems = params => {
  return {
    type: "FETCH_RESELLER_ITEMS",
    payload: { params }
  };
};

export const fetchItemsSuccess = items => {
  return {
    type: "FETCH_RESELLER_ITEMS_SUCCESS",
    payload: { items }
  };
};

export const fetchItemsError = error => {
  return {
    type: "FETCH_RESELLER_ITEMS_ERROR",
    payload: { error }
  };
};

export const createResellerItems = params => {
  return {
    type: "CREATE_RESELLER_ITEMS",
    payload: { params }
  };
};

export const createItemsSuccess = () => {
  return {
    type: "CREATE_RESELLER_ITEMS_SUCCESS"
  };
};

export const createItemsError = error => {
  return {
    type: "CREATE_RESELLER_ITEMS_ERROR",
    payload: { error }
  };
};
