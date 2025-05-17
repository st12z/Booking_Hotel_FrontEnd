import { get, getAuthorization, getCredentials, post } from "../../utils/requestUserService";

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
  const res= await getCredentials(query);
  return res;
}
export const getInfoUser = async () => {
  const result = await getAuthorization("info-user");
  return result;
}
export const getInfoUserById = async(id)=>{
  const result = await get(`get-user/${id}`);
  return result;
}
export const createRoomChats=async(data)=>{
  const result = await post(`create-rooms`,data);
  return result;
}
export const updateVisits = async(userId)=>{
  const url=userId ? `update-visits?userId=${userId}`:`update-visits`;
  const result= await get(url);
  return result;
}
export const getAmountVisits=async()=>{
  const result= await get(`amount-visits`);
  return result;
}
export const getAmountUsers = async()=>{
  const result= await get(`amount-users`);
  return result;
}