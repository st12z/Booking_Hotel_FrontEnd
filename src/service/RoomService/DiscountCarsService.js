import { get,post } from "../../utils/requestRoomService"

export const getAllDiscountCars= async()=>{
  const result = await get(`discount-cars`);
  return result;
}
export const getDiscountCarsByUser = async(email)=>{
  const result = await get(`discount-cars/my-discounts/${email}`);
  return result;
}
export const saveDiscountCar = async(id)=>{
  const result = await post(`discount-cars/save-discount`,id);
  return result;
}