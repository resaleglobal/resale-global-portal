export const fetchResellerCategories = params => {
  return {
    type: "FETCH_RESELLER_CATEGORIES",
    payload: { params }
  };
};

export const fetchCategoriesSuccess = categories => {
  return {
    type: "FETCH_RESELLER_CATEGORIES_SUCCESS",
    payload: { categories }
  };
};

export const fetchCategoriesError = error => {
  return {
    type: "FETCH_RESELLER_CATEGORIES_ERROR",
    payload: { error }
  };
};

export const showResellerCategories = () => {
  return {
    type: "SHOW_RESELLER_CATEGORIES"
  };
};

export const hideResellerCategories = () => {
  return {
    type: "HIDE_RESELLER_CATEGORIES"
  };
};

export const createResellerCategories = params => {
  return {
    type: "CREATE_RESELLER_CATEGORIES",
    payload: { params }
  };
};

export const createCategoriesSuccess = () => {
  return {
    type: "CREATE_RESELLER_CATEGORIES_SUCCESS"
  };
};

export const createCategoriesError = error => {
  return {
    type: "CREATE_RESELLER_CATEGORIES_ERROR",
    payload: { error }
  };
};

export const fetchResellerSelectedCategories = params => {
  return {
    type: "FETCH_RESELLER_SELECTED_CATEGORIES",
    payload: { params }
  };
};

export const fetchSelectedCategoriesSuccess = categories => {
  return {
    type: "FETCH_RESELLER_SELECTED_CATEGORIES_SUCCESS",
    payload: { categories }
  };
};

export const fetchSelectedCategoriesError = error => {
  return {
    type: "FETCH_RESELLER_SELECTED_CATEGORIES_ERROR",
    payload: { error }
  };
};

export const fetchResellerSelectedAttributes = categoryId => {
  return {
    type: "FETCH_RESELLER_SELECTED_ATTRIBUTES",
    payload: { categoryId }
  };
};

export const fetchSelectedAttributesSuccess = attributes => {
  return {
    type: "FETCH_RESELLER_SELECTED_ATTRIBUTES_SUCCESS",
    payload: { attributes }
  };
};

export const fetchSelectedAttributesError = error => {
  return {
    type: "FETCH_RESELLER_SELECTED_ATTRIBUTES_ERROR",
    payload: { error }
  };
};
