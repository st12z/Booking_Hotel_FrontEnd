import {  postImages,get } from "../../utils/requestRoomService"
import { getAuthorization } from "../getAuthorization";

export const createReview = async(data)=>{
  const res = await postImages("reviews",data);
  return res;
}
export const deleteReview=async(id)=>{
  const res= await get(`reviews/delete/${id}`);
  return res;
}
export const getReviewsByPropertyId=async(propertyId)=>{
  const res= await get(`reviews?propertyId=${propertyId}`);
  return res;
}
export const getAmountReviews = async()=>{
  const result = await getAuthorization(`rooms/api/reviews/amount-reviews`);
  return result;
}