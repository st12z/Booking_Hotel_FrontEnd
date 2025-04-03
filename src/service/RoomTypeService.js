import { get, post } from "../utils/request"

export const getRoomTypesBySlugProperty=async(query)=>{
  const result = await get(`roomtypes?${query}`);
  return result;
}
export const getRoomTypesBySearchRequest=async(query,data)=>{
  const result = await post(`roomtypes?${query}`,data);
  return result;
}