import { get } from "../../utils/requestRoomService";

export const getRoomChatsOfUser=async(userId)=>{
  const res = await get(`room-chats/rooms/${userId}`);
  return res;
}
export const getRoomChatsId = async(id)=>{
  const res = await get(`room-chats/${id}`);
  return res;
}