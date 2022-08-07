import axios from "axios";
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (err) => {
    if (401 === err.response.status) {
      localStorage.removeItem("user");
      window.location.reload();
    } else {
      return Promise.reject(err);
    }
  }
);

function getIRequestProp(severType, isMultipart) {
  const serverUrl = process.env.REACT_APP_APIURL;
  const token = localStorage.getItem("accessToken");

  return {
    serverUrl: serverUrl,
    requestHeader: {
      Accept: isMultipart ? "multipart/form-data" : "application/json",
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
      // 'Accept-Language': config.DEFAULT_LANGUAGE,
      Authorization: `Bearer ${token}`,
    },
  };
}

async function get(url, parameter, isJsonServer) {
  const { serverUrl, requestHeader } = getIRequestProp(isJsonServer);
  return axios.get(serverUrl + url, {
    params: parameter,
    headers: requestHeader,
  });
}
async function getGoogleAPI(url) {
  return axios.get(url);
}
async function post(url, body, isJsonServer, isMultipart) {
  const { serverUrl, requestHeader } = getIRequestProp(
    isJsonServer,
    isMultipart
    );
    return axios.post(serverUrl + url, body, {
      headers: requestHeader,
    });
}
async function put(url, body, isJsonServer) {
  const { serverUrl, requestHeader } = getIRequestProp(isJsonServer);
  return axios.put(serverUrl + url, body, {
    headers: requestHeader,
  });
}
async function patch(url, body, isJsonServer) {
  const { serverUrl, requestHeader } = getIRequestProp(isJsonServer);
  return axios.patch(serverUrl + url, body, {
    headers: requestHeader,
  });
}
async function remove(url, body, isJsonServer) {
  const { serverUrl, requestHeader } = getIRequestProp(isJsonServer);
  return axios.delete(serverUrl + url, {
    data: body,
    headers: requestHeader,
  });
}
const AxiosServices = {
  get,
  post,
  put,
  patch,
  remove,
  getGoogleAPI,
};
export default AxiosServices;
