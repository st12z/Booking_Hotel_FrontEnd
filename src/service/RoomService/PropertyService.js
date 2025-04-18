import { get, post } from "../../utils/requestRoomService";

export const getPropertyBySlug=async(path)=>{
  const result = await get(`properties/slug/${path}`);
  return result;
}
export const getPropertiesBySuggest=async(data)=>{
  const result = await post(`properties`,data);
  return result;
}
export const getPropertyId = async(id)=>{
  const result = await get(`properties/id/${id}`);
  return result;
}