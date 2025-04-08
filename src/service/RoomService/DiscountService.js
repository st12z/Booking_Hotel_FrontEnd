import { get,  getApiProtected,  post } from "../../utils/requestRoomService";

export const getAllDiscounts=async ()=>{
  const result = await get(`discounts`);
  return result;
}