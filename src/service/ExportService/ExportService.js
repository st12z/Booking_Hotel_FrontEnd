import { getAuthorizationBlob } from "../getAuthorization";
// bookings
export const exportBills = async()=>{
  const res = await getAuthorizationBlob(`bookings/api/export/bills`);
  return res;
}
export const exportRefundBills = async()=>{
  const res = await getAuthorizationBlob(`bookings/api/export/refund-bills`);
  return res;
}
//payments
export const exportTransactions = async()=>{
  const res = await getAuthorizationBlob(`payments/api/export/payment-transactions`);
  return res;
}
export const exportPaymentTranLogs=async()=>{
  const res = await getAuthorizationBlob(`payments/api/export/suspicious-tran-logs`);
  return res;
}
//rooms
export const exportListCities = async()=>{
  const res = await getAuthorizationBlob(`rooms/api/export/cities`);
  return res;
}
export const exportTrips = async()=>{
  const res = await getAuthorizationBlob(`rooms/api/export/trips`);
  return res;
}
export const exportTripTypes= async()=>{
  const res = await getAuthorizationBlob(`rooms/api/export/triptypes`);
  return res;
}