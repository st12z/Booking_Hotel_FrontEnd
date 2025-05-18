import { get} from "../../utils/requestBookingService";
import { getAuthorization } from "../getAuthorization";

export const getAllBills = async()=>{
  const res = await getAuthorization(`bookings/api/bills/all`);
  return res;
}
export const getMyBills = async (email, pageNo = 1, pageSize = 5) => {
  const res = await get(
    `bills?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return res;
};
export const getBillByKeyword = async (email, pageNo, pageSize, keyword) => {
  const res = await get(
    `bills/search?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
  );
  return res;
};
export const getBillByBillCode = async (billCode) => {
  const res = await get(`bills/${billCode}`);
  return res;
};
export const getAmountBills = async () => {
  const res = await getAuthorization(`bookings/api/bills/amount-bills`);
  return res;
};
export const getAmountRevenueToday = async () => {
  const res = await getAuthorization(`bookings/api/bills/amount-revenue`);
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