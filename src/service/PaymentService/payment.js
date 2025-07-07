import { get } from "../../utils/requestPaymentService";
import { getAuthorization, postAuthorization } from "../getAuthorization";

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