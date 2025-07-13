import { get, post } from "../../utils/requestPaymentService";
import { getAuthorization, getAuthorizationBlob, postAuthorization } from "../getAuthorization";

export const callBackPayment = async () => {
  const res = await getAuthorization("payments/api/payments/vn-pay-callback");
  return res;
}
export const cancelBooking = async(billCode)=>{
  const res = await getAuthorization(`payments/api/payments/refund/${billCode}`);
  return res;
}
export const getAmountTransactionByMonth = async(filter)=>{
  const res = await postAuthorization(`payments/api/payments/amount-transaction-month`,filter);
  return res;
}
export const getRevenuePaymentTransactionByMonth= async(filter)=>{
  const res = await postAuthorization(`payments/api/payments/revenue-transaction-month`,filter);
  return res;
}
export const getStatisticTransactionType = async(month)=>{
  const res = await getAuthorization(`payments/api/payments/statistic-transactiontype-month/${month}`);
  return res;
}
export const getAllPaymentTransactions = async(filter)=>{
  const res = await postAuthorization(`payments/api/payments/list-transactions`,filter);
  return res;
}
export const getAllTransactionTypes = async()=>{
  const res = await getAuthorization(`payments/api/payments/transaction-types`);
  return res;
}
export const getSearchTransaction = async(keyword,pageNo,pageSize)=>{
  const res = await getAuthorization(`payments/api/payments/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return res;
}
export const checkBookingPolicy = async(data)=>{
  const res = await postAuthorization(`payments/api/payments/check-booking`,data);
  return res;
}
export const getCheckOtp = async(otp,uniqueCheck)=>{
  const res = await getAuthorization(`payments/api/payments/check-otp?otp=${otp}&uniqueCheck=${uniqueCheck}`);
  return res;
}
export const getAllSuspiciousTransType = async()=>{
  const res = await getAuthorization(`payments/api/suspicious-transaction/get-types`);
  return res;
}
export const getAllSuspiciousTransByFilter=async(filter)=>{
  const res = await postAuthorization(`payments/api/suspicious-transaction/filter`,filter);
  return res;
}
export const getSuspiciousTransByKeyword = async(keyword,pageNo,pageSize)=>{
  const res = await getAuthorization(`payments/api/suspicious-transaction/keyword?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
  return res;
}
export const getPaymentTransactionLocked = async(keyword,pageNo,pageSize)=>{
  const res = await getAuthorization(`payments/api/suspicious-transaction/payment-trans-locked?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
  return res;
}
export const getUnclockedUserIdsTrans = async(userIds)=>{
  const res = await postAuthorization(`payments/api/suspicious-transaction/unclocked`,userIds);
  return res;
}
