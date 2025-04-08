import { get, post } from "../../utils/requestRoomService";

export const getFacilities=async()=>{
  const result = get(`facilities`);
  return result;
}