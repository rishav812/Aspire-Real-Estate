export const getAccessToken = async () => {
  const list = localStorage.getItem("login");     //token is in string form
  return list;
};
