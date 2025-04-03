import { get } from "../utils/request"

export const getRoomTypesBySlugProperty=async(query)=>{
  const result = await get(`roomtypes?${query}`);
  return result;
}