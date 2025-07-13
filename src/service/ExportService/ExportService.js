import { getAuthorizationBlob } from "../getAuthorization";

export const exportBills = async()=>{
  const res = await getAuthorizationBlob(`bookings/api/export/bills`);
  return res;
}
export const exportRefundBills = async()=>{
  const res = await getAuthorizationBlob(`bookings/api/export/refund-bills`);
  return res;
}
export const exportTransactions = async()=>{
  const res = await getAuthorizationBlob(`payments/api/export/payment-transactions`);
  return res;
}
export const exportPaymentTranLogs=async()=>{
  const res = await getAuthorizationBlob(`payments/api/export/suspicious-tran-logs`);
  return res;
}