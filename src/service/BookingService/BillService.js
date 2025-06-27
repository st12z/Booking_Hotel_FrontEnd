import { get} from "../../utils/requestBookingService";
import { getAuthorization, postAuthorization } from "../getAuthorization";
export const getAllBills = async(data)=>{
  const res  = await postAuthorization(`bookings/api/bills/all`,data);
  return res;
}
export const getRecentlyBills = async()=>{
  const res = await getAuthorization(`bookings/api/bills/recently`);
  return res;
}
export const getSearchBills = async (keyword, pageNo = 1, pageSize = 10) => {
  const res = await getAuthorization(
    `bookings/api/bills/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return res;
}
export const getMyBills = async (pageNo = 1, pageSize = 5,keyword) => {
  const res = await getAuthorization(
    `bookings/api/bills?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
  );
  return res;
};
export const getBillByKeyword = async (email, pageNo, pageSize, keyword) => {
  const res = await getAuthorization(
    `bookings/api/bills/search?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
  );
  return res;
};
export const getBillByBillCode = async (billCode) => {
  const res = await getAuthorization(`bookings/api/bills/${billCode}`);
  return res;
};
export const getAmountBillsToday = async () => {
  const res = await getAuthorization(`bookings/api/bills/amount-bills-today`);
  return res;
};
export const getAmountRevenueToday = async () => {
  const res = await getAuthorization(`bookings/api/bills/amount-revenue-today`);
  return res;
};
export const getAmountBillsByMonth=async(month)=>{
  const result = await getAuthorization(`bookings/api/bills/amount-bills-month?month=${month}`);
  return result;
}
export const getAmountRevenueByMonth=async(month)=>{
  const result = await getAuthorization(`bookings/api/bills/amount-revenue-month?month=${month}`);
  return result;
}
export const getAllBillTypeStatus = async()=>{
  const res = await getAuthorization(`bookings/api/bills/bill-type-status`);
  return res;
}