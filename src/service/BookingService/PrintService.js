import { getAuthorization, getFileAuthorization } from "../getAuthorization";

export const getPrintBill = async(id)=>{
  const res = await getFileAuthorization(`bookings/api/prints/bills/${id}`);
  return res;
}
export const getPrintRefundBill = async(id)=>{
  const res = await getFileAuthorization(`bookings/api/prints/refund-bills/${id}`);
  return res;
}