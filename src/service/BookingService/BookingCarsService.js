import { get } from "../../utils/requestBookingService"
import { getAuthorization } from "../getAuthorization";

export const getBookingCarsByBillId = async(billId)=>{
  const res = getAuthorization(`bookings/api/bookingcars/${billId}`);
  return res;
}