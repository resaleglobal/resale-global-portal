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

export const clearResellerItems = () => {
  return {
    type: "CLEAR_RESELLER_ITEMS"
  };
};

export const createResellerItems = (params, createAnother) => {
  return {
    type: "CREATE_RESELLER_ITEMS",
    payload: { params, createAnother }
  };
};

export const createItemsSuccess = params => {
  return {
    type: "CREATE_RESELLER_ITEMS_SUCCESS",
    payload: { params }
  };
};

export const createItemsError = error => {
  return {
    type: "CREATE_RESELLER_ITEMS_ERROR",
    payload: { error }
  };
};
