import { get } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization } from "../getAuthorization";

export const getRoomChatsOfUser=async(userId)=>{
  const res = await getAuthorization(`rooms/api/room-chats/rooms/${userId}`);
  return res;
}
export const getRoomChatsId = async(id)=>{
  const res = await getAuthorization(`rooms/api/room-chats/${id}`);
  return res;
}
export const getAllRoomChats = async(keyword,pageNo,pageSize)=>{
  const res = await getAuthorization(`rooms/api/room-chats/all?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return res;
}
export const updateRoomChats = async(data)=>{
  const res = await postAuthorization(`rooms/api/room-chats/update`,data);
  return res;
}