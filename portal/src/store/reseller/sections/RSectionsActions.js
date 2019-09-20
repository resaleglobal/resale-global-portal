export const fetchResellerSections = params => {
  return {
    type: "FETCH_RESELLER_SECTIONS",
    payload: { params }
  };
};

export const fetchSectionsSuccess = sections => {
  return {
    type: "FETCH_RESELLER_SECTIONS_SUCCESS",
    payload: { sections }
  };
};

export const fetchSectionsError = error => {
  return {
    type: "FETCH_RESELLER_SECTIONS_ERROR",
    payload: { error }
  };
};

export const clearResellerDropdownSections = () => {
  return {
    type: "CLEAR_RESELLER_DROPDOWN_SECTIONS"
  };
};

export const fetchResellerDropdownSections = params => {
  return {
    type: "FETCH_RESELLER_DROPDOWN_SECTIONS",
    payload: { params }
  };
};

export const fetchDropdownSectionsSuccess = sections => {
  return {
    type: "FETCH_RESELLER_DROPDOWN_SECTIONS_SUCCESS",
    payload: { sections }
  };
};

export const fetchDropdownSectionsError = error => {
  return {
    type: "FETCH_RESELLER_DROPDOWN_SECTIONS_ERROR",
    payload: { error }
  };
};

export const createResellerSections = params => {
  return {
    type: "CREATE_RESELLER_SECTIONS",
    payload: { params }
  };
};

export const createSectionsSuccess = () => {
  return {
    type: "CREATE_RESELLER_SECTIONS_SUCCESS"
  };
};

export const createSectionsError = error => {
  return {
    type: "CREATE_RESELLER_SECTIONS_ERROR",
    payload: { error }
  };
};

export const showResellerSections = () => {
  return {
    type: "SHOW_RESELLER_SECTIONS"
  };
};

export const hideResellerSections = () => {
  return {
    type: "HIDE_RESELLER_SECTIONS"
  };
};

export const selectResellerSections = params => {
  return {
    type: "SELECT_RESELLER_SECTIONS",
    payload: { params }
  };
};

export const selectSectionsSuccess = params => {
  return {
    type: "SELECT_RESELLER_SECTIONS_SUCCESS",
    payload: { params }
  };
};

export const selectSectionsError = (error, params) => {
  return {
    type: "SELECT_RESELLER_SECTIONS_ERROR",
    payload: { error, params }
  };
};
