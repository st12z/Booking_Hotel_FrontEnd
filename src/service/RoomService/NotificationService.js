import { get } from "../../utils/requestRoomService"

export const getAllNotifications=async()=>{
  const res = await get(`notifications`);
  return res;
}