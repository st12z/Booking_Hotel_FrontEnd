import { get } from "../../utils/requestRoomService"
import { getAuthorization } from "../getAuthorization";

export const getAllNotifications=async()=>{
  const res = await getAuthorization(`rooms/api/notifications`);
  return res;
}