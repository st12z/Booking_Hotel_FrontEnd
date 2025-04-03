import { get } from "../utils/request"

export const getPropertyBySlug=async(path)=>{
  const result = await get(`properties/${path}`);
  return result;
}