

export const submitLogin = (loginParams) => {
  return {
    type: "SUBMIT_LOGIN",
    payload: loginParams
  }
}