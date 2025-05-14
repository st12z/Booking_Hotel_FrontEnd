import {  postImages,get } from "../../utils/requestRoomService"

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