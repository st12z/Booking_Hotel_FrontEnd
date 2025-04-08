import { get, post } from "../../utils/requestRoomService";

export const getPropertyBySlug=async(path)=>{
  const result = await get(`properties/${path}`);
  return result;
}
export const getPropertiesBySuggest=async(data)=>{
  const result = await post(`properties`,data);
  return result;
}