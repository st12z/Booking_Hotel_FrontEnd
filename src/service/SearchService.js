import { get } from "../utils/request"

export const getPropertiesBySearch =async (query)=>{
  const result = await get(`search?${query}`);
  return result;
}