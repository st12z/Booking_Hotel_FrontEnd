import { get, post } from "../../utils/requestRoomService";

export const getAllTrips=async ()=>{
  const result = await get(`trips`);
  return result;
}
export const getTripsByType=async (tripType)=>{
  const result = await get(`trips?trip=${tripType}`);
  return result;
}
export const getAllTripTypes=async (trip)=>{
  const result = await get(`triptypes`);
  return result;
}
