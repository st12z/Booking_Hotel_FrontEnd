import { get, post } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization } from "../getAuthorization";

export const getAllRoomTypes = async()=>{
  const result = await getAuthorization(`rooms/api/roomtypes/all`);
  return result;
}
export const getRoomTypesBySlugProperty=async(query)=>{
  const result = await getAuthorization(`rooms/api/roomtypes?${query}`);
  return result;
}
export const getRoomTypesBySearchRequest=async(query,data)=>{
  const result = await postAuthorization(`rooms/api/roomtypes?${query}`,data);
  return result;
}

export const checkEnoughQuantityRooms=async(query,data)=>{
  const res= await postAuthorization(`rooms/api/roomtypes/${query}`,data);
  return res;
}
export const getRoomTypeById = async(id)=>{
  const res = await getAuthorization(`rooms/api/roomtypes/${id}`);
  return res;
} 
export const holdRooms = async(data)=>{
  const res = await postAuthorization(`rooms/api/roomtypes/hold-rooms`,data);
  return res;
}
export const checkBookingRooms = async(data)=>{
  const res= await postAuthorization(`rooms/api/roomtypes/check-bookrooms`,data);
  return res;
}
export const createRoomType = async(data)=>{
  const res = await postAuthorization(`rooms/api/roomtypes/create`,data);
  return res;
}