import { get } from "../../utils/requestBookingService"

export const getMyBills = async(email,pageNo=1,pageSize=5)=>{
  const res = await get(`bills?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return res;
}
export const getBillByKeyword=async(email,pageNo,pageSize,keyword)=>{
  const res = await get(`bills/search?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
  return res;
}
export const getBillByBillCode = async(billCode)=>{
  const res= await get(`bills/${billCode}`);
  return res;
}