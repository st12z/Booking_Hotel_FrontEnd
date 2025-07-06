import { getAuthorization, postAuthorization } from "../getAuthorization"

export const getAllRefundBills=async(filter)=>{
  const res = await postAuthorization(`bookings/api/refund-bills/filter`,filter);
  return res;
}
export const getSearchRefundBills= async(keyword)=>{
  const res  = await getAuthorization(`bookings/api/refund-bills/search?keyword=${keyword}`);
  return res;
}
export const getRefundBillById = async(id)=>{
  const res = await getAuthorization(`bookings/api/refund-bills/${id}`);
  return res;
}
export const getRevenueRefundByMonth = async(month)=>{
  const res = await getAuthorization(`bookings/api/refund-bills/amount-refund-month/${month}`);
  return res;
}