import { get, post } from "../../utils/requestRoomService";
import { getAuthorization } from "../getAuthorization";



export const getChatsByRoomChatId=async(roomChatId)=>{
  const res = await getAuthorization(`rooms/api/chats/messages/${roomChatId}`);
  return res;
}