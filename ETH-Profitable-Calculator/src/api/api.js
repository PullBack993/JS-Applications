const hostname = "https://parseapi.back4app.com";
const KEYS = {
  "X-Parse-Application-Id": "XANaZKm9rlunMoCSxilQOIjJL4iv86GjLeW1EwDW",
  "X-Parse-REST-API-Key": "vPI3ngTW30SNkW83Qwde8roDqtwsde6ChmDpgEb5",
};



async function request(url, options) {
  try {
    const response = await fetch(url, options); 

    if (response.ok == false) {
      if (response.status == 403) {
      }
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  } catch (err) {
    throw err.message;
  }
}

function createOptions(method = "get", data, apiKey) {
  let options = null;
  apiKey == undefined
    ? (options = { method, headers: {} })
    : (options = { method, headers: apiKey });


  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }


  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null && method != 'get') {
    options.headers["X-Parse-Revocable-Session"] = userData.token;
  }
  return options;
}

export async function get(url) {
  return request(url, createOptions());
}

export async function post(url, data, apiKey) {
  return request(url, createOptions("post", data, apiKey));
}

export async function put(url, data) {
  return request(url, createOptions("put", data));
}

export async function del(url) {
  return request(url, createOptions("delete"));
}


export async function login(username, password) {
  const result = await post(`${hostname}/login`, { username, password}, KEYS);

  const userData = {
    username: result.username,
    id: result.objectId,
    token: result.sessionToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

export async function register(username, email, password) {
  const result = await post(`${hostname}/users`, { username, email, password }, KEYS);

  const userData = {
    username,
    id: result.objectId,
    token: result.sessionToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

export async function logout() {
  await post(`${hostname}/logout`, undefined,KEYS);
  sessionStorage.removeItem("userData");
}
