import { get, post } from "../../utils/requestRoomService";
import { getAuthorization } from "../getAuthorization";

export const getChatsByRoomChatId = async (roomChatId) => {
  const res = await getAuthorization(`rooms/api/chats/messages/${roomChatId}`);
  return res;
};
export const getAllMessagesByRoomChatId = async (roomChatId, userId, pageNo, pageSize) => {
  const query= userId ? `rooms/api/chats/messages-page/${roomChatId}
    ?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}` : `rooms/api/chats/messages-page/${roomChatId}
    ?pageNo=${pageNo}&pageSize=${pageSize}`
  const res =
    await getAuthorization(query);
  return res;
};
