import { get } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization } from "../getAuthorization";

export const getAllPropertyTypes = async()=>{
  const res = getAuthorization(`rooms/api/property-types`);
  return res;
}
export const getAllPropertyTypesPage = async(keyword, pageNo, pageSize)=>{
  const res = getAuthorization(`rooms/api/property-types/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return res;
}
export const getPropertyTypeById = async(id)=>{
  const res = getAuthorization(`rooms/api/property-types/${id}`);
  return res;
}
export const updatePropertyType =async(id,data)=>{
  const res = postAuthorization(`rooms/api/property-types/update/${id}`,data);
  return res;
}

export const createPropertyType =async(data)=>{
  const res = postAuthorization(`rooms/api/property-types/create`,data);
  return res;
}