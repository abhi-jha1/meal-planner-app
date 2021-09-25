const API_HOST = 'http://localhost:3010';

export function logOut() {
  localStorage.clear('authToken')
}

export function getToken(item) {
  const data = localStorage.getItem('authToken');
  if (data) {
    const json = JSON.parse(data);
    return item && json[item] ? json[item] : json;
  }
  return null;
}
export function login(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };
      const resp = await (await fetch(`${API_HOST}/api/login`, options)).json();
      return resolve(resp);
    } catch (error) {
      return reject(error);
    }
  })
}

export function signup(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };
      const resp = await (await fetch(`${API_HOST}/api/signup`, options)).json();
      return resolve(resp);
    } catch (error) {
      return reject(error);
    }
  })
}

export function getMeals(params={}) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken('token')}`
        }
      };
      const url = new URL(`${API_HOST}/api/meals`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      const resp = await (await fetch(`${API_HOST}/api/meals`, options)).json();
      return resolve(resp);
    } catch (error) {
      return reject(error);
    }
  })
}