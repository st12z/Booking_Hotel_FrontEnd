import { get, post } from "../../utils/requestRoomService";


export const getRoomChatsOfUser=async(userId)=>{
  const res = await get(`chats/rooms/${userId}`);
  return res;
}
export const getChatsByRoomChatId=async(roomChatId)=>{
  const res = await get(`chats/messages/${roomChatId}`);
  return res;
}