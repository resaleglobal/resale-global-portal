import store from './../store/store';


export const get = (url) => {
  return fetchBase(url, 'GET', getAuthHeader())
}

export const getNonAuth = (url) => {
  return fetchBase(url, 'GET')
}

export const post = (url, params) => {
  return fetchBase(url, 'GET', getAuthHeader(), params)
}

export const postNonAuth = (url, params) => {
  return fetchBase(url, 'GET', {}, params)
}

const getAuthHeader = () => {
  const token = store.getState().auth.token

  return {
    'Authorization': `Bearer ${token}`
  }
}


const fetchBase = (url, method, headers={}, params=null) => {

  

  let content = {
    method: method,
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
  }

  if (params) {
    content = {
      ...content,
      body: JSON.stringify(params)
    }
  }



  return fetch(`http://localhost:8000${url}`, content)
}