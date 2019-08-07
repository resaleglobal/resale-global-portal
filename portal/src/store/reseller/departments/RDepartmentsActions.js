export const fetchResellerDepartments = params => {
  return {
    type: "FETCH_RESELLER_DEPARTMENTS",
    payload: { params }
  };
};

export const fetchDepartmentsSuccess = departments => {
  return {
    type: "FETCH_RESELLER_DEPARTMENTS_SUCCESS",
    payload: { departments }
  };
};

export const fetchDepartmentsError = error => {
  return {
    type: "FETCH_RESELLER_DEPARTMENTS_ERROR",
    payload: { error }
  };
};

export const createResellerDepartments = params => {
  return {
    type: "CREATE_RESELLER_DEPARTMENTS",
    payload: { params }
  };
};

export const createDepartmentsSuccess = () => {
  return {
    type: "CREATE_RESELLER_DEPARTMENTS_SUCCESS"
  };
};

export const createDepartmentsError = error => {
  return {
    type: "CREATE_RESELLER_DEPARTMENTS_ERROR",
    payload: { error }
  };
};

export const showResellerDepartments = () => {
  return {
    type: "SHOW_RESELLER_DEPARTMENTS",
  };
};

export const hideResellerDepartments = () => {
  return {
    type: "HIDE_RESELLER_DEPARTMENTS",
  };
};