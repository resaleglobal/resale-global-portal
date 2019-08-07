export const fetchResellerAttributes = params => {
  return {
    type: "FETCH_RESELLER_ATTRIBUTES",
    payload: { params }
  };
};

export const fetchAttributesSuccess = attributes => {
  return {
    type: "FETCH_RESELLER_ATTRIBUTES_SUCCESS",
    payload: { attributes }
  };
};

export const fetchAttributesError = error => {
  return {
    type: "FETCH_RESELLER_ATTRIBUTES_ERROR",
    payload: { error }
  };
};