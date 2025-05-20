import { getAuthorization, postImagesAuthorization } from "../getAuthorization";

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