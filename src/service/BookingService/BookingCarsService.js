import { get } from "../../utils/requestBookingService"

export const getBookingCarsByBillId = async(billId)=>{
  const res = get(`bookingcars/${billId}`);
  return res;
}