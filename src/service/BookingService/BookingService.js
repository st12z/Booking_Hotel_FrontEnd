import { post } from "../../utils/requestBookingService"

export const confirmBooking = async(data)=>{
  const res = await post("bookings/confirm",data);
  return res;
}