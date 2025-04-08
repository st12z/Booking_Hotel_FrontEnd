import { get, post } from "../../utils/requestRoomService";

export const getPropertiesBySearch =async (query)=>{
  const result = await get(`search?${query}`);
  return result;
}
export const getPropertiesFilterAfterSearch=async(query,data)=>{
  const result = await post(`search?${query}`,data);
  return result;
}