import { get, post } from "../../utils/requestRoomService";
import { postImagesAuthorization } from "../getAuthorization";


export const getAllCities=async ()=>{
  const result = await get(`cities`);
  return result;
}
export const getAllCitiesByPage = async(pageNo,pageSize)=>{
  const result = await get(`cities/city-page?pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getCitiesByKeyword = async(keyword,pageNo,pageSize)=>{
  const result = await get(`cities/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getCityById = async(id)=>{
  const result = await get(`cities/${id}`);
  return result;
}
export const updateCity = async(id,data)=>{
  const result = await postImagesAuthorization(`rooms/api/cities/update/${id}`,data);
  return result;
}
export const createCity = async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/cities/create`,data);
  return result;
}