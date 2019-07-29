export const submitLogin = loginParams => {
  return {
    type: "SUBMIT_LOGIN",
    payload: { params: loginParams }
  };
};

export const loginSuccess = token => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { token }
  };
};

export const loginError = error => {
  return {
    type: "LOGIN_ERROR",
    payload: { error }
  };
};

export const submitCreateShopifyUser = params => {
  return {
    type: "SUBMIT_CREATE_SHOPIFY_USER",
    payload: { params }
  };
};

export const createShopifyUserError = error => {
  return {
    type: "CREATE_SHOPIFY_USER_ERROR",
    payload: { error }
  };
};

export const submitLogout = () => {
  return {
    type: "SUBMIT_LOGOUT"
  };
};

export const submitLogoutSuccess = () => {
  return {
    type: "SUBMIT_LOGOUT_SUCCESS"
  };
};

export const submitRegisterInvitedUser = params => {
  return {
    type: "SUBMIT_REGISTER_INVITED_USER",
    payload: { params }
  };
};

export const submitRegisterInvitedConsignor = params => {
  return {
    type: "SUBMIT_REGISTER_INVITED_CONSIGNOR",
    payload: { params }
  };
};
