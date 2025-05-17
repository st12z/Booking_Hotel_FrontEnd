import { get } from "../../utils/requestBookingService";

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
  const res = await get(`bills/amount-bills`);
  return res;
};
export const getAmountRevenueToday = async () => {
  const res = await get(`bills/amount-revenue`);
  return res;
};
export const getAmountBillsByMonth=async(month)=>{
  const result = await get(`bills/amount-bills-month?month=${month}`);
  return result;
}