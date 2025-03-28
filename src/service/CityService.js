import {get} from "../utils/request";
export const getAllCities=async ()=>{
  const result = await get(`cities`);
  return result;
}