import { get, getCredentials, post } from "../../utils/requestUserService";
import { getAuthorization, postAuthorization } from "../getAuthorization";

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
  const result = await getAuthorization("users/api/users/info-user");
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
export const getAmountVisitsToday=async()=>{
  const result= await getAuthorization(`users/api/users/amount-visits-today`);
  return result;
}
export const getAmountUsers = async()=>{
  const result= await getAuthorization(`users/api/users/amount-users`);
  return result;
}
export const getAmountVisitsByMonth=async(month)=>{
  const result= await getAuthorization(`users/api/users/amount-visits-month?month=${month}`);
  return result;
}
export const getAllUsersAdmin = async()=>{
  const result= await getAuthorization(`users/api/users/all-users-admin`);
  return result;
}
export const getAllUsers = async(filter)=>{
  const result= await postAuthorization(`users/api/users/filter`,filter);
  return result;
}
export const getSearchUsers = async(keyword,pageNo,pageSize)=>{
  const result= await getAuthorization(`users/api/users/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const resetPassword = async(id)=>{
  const result= await getAuthorization(`users/api/users/reset-password/${id}`);
  return result;
}
export const updateRolesByUserId = async(id,roles)=>{
  const result = await postAuthorization(`users/api/users/update-roles/${id}`,roles);
  return result;
}