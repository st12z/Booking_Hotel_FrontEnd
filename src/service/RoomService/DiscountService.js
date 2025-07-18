import { get, post } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization, postImagesAuthorization } from "../getAuthorization";


export const getAllDiscounts=async ()=>{
  const result = await get(`discounts`);
  return result;
}
export const saveDiscount = async(id)=>{
  const result = await postAuthorization(`rooms/api/discounts/save`,id);
  return result;
}
export const getDiscountHotelsByUser = async()=>{
  const result = await getAuthorization(`rooms/api/discounts/my-discounts`);
  return result;
}
export const getDiscountHotelsByUserPage = async(pageNo,pageSize)=>{
  const result = await getAuthorization(`rooms/api/discounts/my-discounts-page?pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getAllDiscountType = async()=>{
  const result = await getAuthorization(`rooms/api/discounts/discount-types`);
  return result;
}
export const getAllDiscountsByPage = async(filter)=>{
  const result = await postAuthorization(`rooms/api/discounts/filter`,filter);
  return result;
}
export const getSearchDiscounts = async(keyword,pageNo,pageSize)=>{
  const result = await getAuthorization(`rooms/api/discounts/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getDiscountHotelById = async(id)=>{
  const result = await getAuthorization(`rooms/api/discounts/${id}`);
  return result;
}
export const updatDiscountHotel = async(id,data)=>{
  const result = await postImagesAuthorization(`rooms/api/discounts/update/${id}`,data);
  return result;
}
export const createDiscountHotel = async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/discounts/create`,data);
  return result;
}