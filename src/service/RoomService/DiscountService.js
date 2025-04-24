import { get, post } from "../../utils/requestRoomService";


export const getAllDiscounts=async ()=>{
  const result = await get(`discounts`);
  return result;
}
export const saveDiscount = async(id)=>{
  const result = await post(`discounts/save`,id);
  return result;
}
export const getDiscountHotelsByUser = async(email)=>{
  const result = await get(`discounts/my-discounts/${email}`);
  return result;
}
export const getDiscountCarsByUser = async(email)=>{
  const result = await get(`discount-cars/my-discounts/${email}`);
  return result;
}