import { post } from "../../utils/requestBookingService"
import { getAuthorization, postAuthorization } from "../getAuthorization";

export const confirmBooking = async(uniqueCheck)=>{
  const res = await getAuthorization(`bookings/api/bookings/confirm?uniqueCheck=${uniqueCheck}`);
  return res;
}