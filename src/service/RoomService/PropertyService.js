import { get, post } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization, postImagesAuthorization } from "../getAuthorization";
export const getAllProperties = async ()=>{
  const result = await get(`properties/all`);
  return result;
}
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
export const getAmountProperties=async(id)=>{
  const result = await getAuthorization(`rooms/api/properties/amount-properties`);
  return result;
}
export const  getPropertiesByKeyword = async(filter)=>{
  const result = await postAuthorization(`rooms/api/properties/filter`,filter);
  return result;
}
export const updateProperty = async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/properties/update`,data);
  return result;
}