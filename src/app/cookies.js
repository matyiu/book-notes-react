export const getCookie = (name) => {
  const cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
  return cookie ? cookie[1] : false;
};
