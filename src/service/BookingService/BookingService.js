import { post } from "../../utils/requestBookingService"
import { postAuthorization } from "../getAuthorization";

export const confirmBooking = async(data)=>{
  const res = await postAuthorization("bookings/api/bookings/confirm",data);
  return res;
}