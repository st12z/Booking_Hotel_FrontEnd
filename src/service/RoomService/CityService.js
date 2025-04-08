import { get, post } from "../../utils/requestRoomService";


export const getAllCities=async ()=>{
  const result = await get(`cities`);
  return result;
}