import { getAuthorization, getFileAuthorization } from "../getAuthorization";

export const getPrintBill = async(id)=>{
  const res = await getFileAuthorization(`bookings/api/prints/bills/${id}`);
  return res;
}