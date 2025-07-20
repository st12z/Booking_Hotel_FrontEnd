import { getAuthorization, postAuthorization, postImagesAuthorization } from "../getAuthorization";

export const createReview = async(data)=>{
  const res = await postImagesAuthorization("rooms/api/reviews",data);
  return res;
}
export const deleteReview=async(id)=>{
  const res= await getAuthorization(`rooms/api/reviews/delete/${id}`);
  return res;
}
export const getReviewsByPropertyId=async(propertyId)=>{
  const res= await getAuthorization(`rooms/api/reviews?propertyId=${propertyId}`);
  return res;
}
export const getAmountReviews = async()=>{
  const result = await getAuthorization(`rooms/api/reviews/amount-reviews`);
  return result;
}
export const getAllReviews = async(filter)=>{
  const result = await postAuthorization(`rooms/api/reviews/filter`,filter);
  return result;
}
export const getSearchReviews = async(keyword,pageNo,pageSize)=>{
  const result = await getAuthorization(`rooms/api/reviews/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}