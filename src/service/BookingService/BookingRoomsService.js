import { get } from "../../utils/requestBookingService"

export const getBookingRoomsByBillId=async(billId)=>{
  const res= await get(`bookingrooms/${billId}`);
  return res;
}