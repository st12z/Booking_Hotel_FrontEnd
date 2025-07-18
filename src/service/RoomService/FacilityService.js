import { get, post } from "../../utils/requestRoomService";
import { postAuthorization } from "../getAuthorization";

export const getFacilities=async()=>{
  const result = get(`facilities`);
  return result;
}
export const getAllFacilitiesByPage =async(keyword,pageNo,pageSize)=>{
  const result = get(`facilities/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getFacilityById= async(id)=>{
  const result = get(`facilities/${id}`);
  return result;
}
export const updateFacility = async(id,data)=>{
  const result = postAuthorization(`rooms/api/facilities/update/${id}`,data);
  return result;
}
export const createFacility = async(data)=>{
  const result = postAuthorization(`rooms/api/facilities/create`,data);
  return result;
}