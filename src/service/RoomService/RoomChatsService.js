import { get } from "../../utils/requestRoomService";
import { getAuthorization } from "../getAuthorization";

export const getRoomChatsOfUser=async(userId)=>{
  const res = await getAuthorization(`rooms/api/room-chats/rooms/${userId}`);
  return res;
}
export const getRoomChatsId = async(id)=>{
  const res = await getAuthorization(`rooms/api/room-chats/${id}`);
  return res;
}