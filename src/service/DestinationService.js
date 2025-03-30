import { get } from "../utils/request"

export const getDestinationsBySearch=async(query)=>{
  const res = await get(`destinations?${query}`);
  return res;
}