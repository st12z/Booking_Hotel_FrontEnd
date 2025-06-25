import { get } from "../../utils/requestRoomService";
import { deleteAuthorization, postAuthorization } from "../getAuthorization"

export const createRoom = async(data)=>{
  const res = await postAuthorization(`rooms/api/rooms/create`,data);
  return res;
}
export const getQuantityRooms = async(propertyId,roomTypeId)=>{
  const res = await get(`rooms/quantity-rooms?propertyId=${propertyId}&roomTypeId=${roomTypeId}`);
  return res;
}
export const deleteRoom = async(id)=>{
  const res = await deleteAuthorization(`rooms/api/rooms/delete/${id}`);
  return res;
}