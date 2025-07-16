import { get } from "../../utils/requestRoomService";
import { postImagesAuthorization } from "../getAuthorization";

export const getAllTripTypes=async (trip)=>{
  const result = await get(`triptypes`);
  return result;
}
export const getAllTripTypesByPage=async (keyword, pageNo, pageSize)=>{
  const result = await get(`triptypes/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getTripTypeById = async(id)=>{
  const result = await get(`triptypes/${id}`);
  return result;
}
export const updateTripType = async(id,data)=>{
  const result = await postImagesAuthorization(`rooms/api/triptypes/update/${id}`,data);
  return result;
}
export const createTripType = async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/triptypes/create`,data);
  return result;
}