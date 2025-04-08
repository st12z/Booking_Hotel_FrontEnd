import { get, post } from "../../utils/requestRoomService";


export const getDestinationsBySearch=async(query)=>{
  const res = await get(`destinations?${query}`);
  return res;
}
export const getDestinationsBySuggest=async(data)=>{
  const res = await post(`destinations`,data);
  return res;
}