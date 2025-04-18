import { get, post } from "../../utils/requestRoomService";


export const getAllDiscounts=async ()=>{
  const result = await get(`discounts`);
  return result;
}
export const saveDiscount = async(id)=>{
  const result = await post(`discounts/save`,id);
  return result;
}
export const getDiscountsByUser = async(email)=>{
  const result = await get("discounts/my-discounts",email);
  return result;
}