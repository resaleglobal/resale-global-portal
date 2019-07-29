import store from "./../store/store";
import { submitLogout } from "../store/authorization/AuthActions";
import Config from '../environments/Config';

export const get = url => {
  return fetchBase(url, "GET", getAuthHeader());
};

export const getNonAuth = url => {
  return fetchBase(url, "GET");
};

export const post = (url, params) => {
  return fetchBase(url, "POST", getAuthHeader(), params);
};

export const postNonAuth = (url, params) => {
  return fetchBase(url, "POST", {}, params);
};

const getAuthHeader = () => {
  const token = store.getState().auth.token;

  return {
    Authorization: `Bearer ${token}`
  };
};

const fetchBase = (url, method, headers = {}, params = null) => {
  let content = {
    method: method,
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  };

  if (params) {
    content = {
      ...content,
      body: JSON.stringify(params)
    };
  }

  const base = Config.api

  return fetch(`${base}${url}`, content).then(response => {
    if (!response.ok) {
      switch (response.status) {
        case 401:
          if (store.getState().auth.token) {
            return store.dispatch(submitLogout());
          }
          break;
        case 405:
          throw new Error(response.statusText)
        default:
          break;
      }
    }

    return response;
  });
};
