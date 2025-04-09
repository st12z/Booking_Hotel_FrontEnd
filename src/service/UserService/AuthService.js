import { get, getCredentials, post } from "../../utils/requestUserService";
const API_DOMAIN="http://localhost:8072/bookinghotel/users/api";
export const registerUser = async (data) => {
  const res = await post("register", data);
  return res;
}
export const getAccessToken = async (query) => {
  const res = await getCredentials(query);
  return res;
};
export const getAccessTokenByRefreshToken = async (query) => {
  const res = await getCredentials(query);
  return res;
};
export const logout = async (query) => {
  const res= await fetch(`${API_DOMAIN}/${query}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return result;
}