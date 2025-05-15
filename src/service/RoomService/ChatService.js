import { get, post } from "../../utils/requestRoomService";



export const getChatsByRoomChatId=async(roomChatId)=>{
  const res = await get(`chats/messages/${roomChatId}`);
  return res;
}