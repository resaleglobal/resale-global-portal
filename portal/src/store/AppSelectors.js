/**
 * If the initial App is in the loading state.
 */
export const isAppLoading = state => {
  const loadingChecks = [state.user.loadingUser, state.auth.logoutLoading];

  return loadingChecks.some(check => check);
};

/**
 * If the initial app is loaded.
 */
export const isAppLoaded = state => {
  const loadedChecks = [
    state.user.userLoaded, // Initial user has loaded.
    !state.auth.logoutLoading // If logout is loading, the app is no longer loaded.
  ];

  return loadedChecks.every(check => check);
};

export const isAppError = state => {
  const errorChecks = [state.user.hasError];

  return errorChecks.some(check => check);
};

export const isAppAuthenticated = state => {
  const authenticationChecks = [state.auth.token !== null];

  return authenticationChecks.every(check => check);
};
