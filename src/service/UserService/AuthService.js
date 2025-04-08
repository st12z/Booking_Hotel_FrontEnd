import { get, getCredentials, post } from "../../utils/requestUserService";


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