import { get } from "../utils/request"

export const getFacilities=async()=>{
  const result = get(`facilities`);
  return result;
}