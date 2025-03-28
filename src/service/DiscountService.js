import {get} from "../utils/request";
export const getAllDiscounts=async ()=>{
  const result = await get(`discounts`);
  return result;
}