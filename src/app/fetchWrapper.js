import { getCookie } from "./cookies";

export default {
  get: async (url, options = {}) => {
    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      ...options,
    });
  },
  post: async (url, options = {}) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      ...options,
    });
  },
  delete: async (url, options = {}) => {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      ...options,
    });
  },
};
