import { getCookie } from "./cookies";

const handleErrors = (e) => {
  if (e instanceof TypeError) {
    return new Error("Connection error");
  }
};

const sendRequest = async (url, { headers, ...options } = {}) => {
  try {
    return await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      ...options,
    });
  } catch (e) {
    return Promise.reject(handleErrors(e));
  }
};

export default {
  get: async (url, options = {}) => {
    return await sendRequest(url, {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      ...options,
    });
  },
  post: async (url, options = {}) => {
    return await sendRequest(url, {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      ...options,
    });
  },
  delete: async (url, options = {}) => {
    return await sendRequest(url, {
      method: "DELETE",
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      ...options,
    });
  },
};
