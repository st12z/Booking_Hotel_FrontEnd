import { get, post } from "../../utils/requestRoomService";
import { postImagesAuthorization } from "../getAuthorization";

export const getAllTrips=async ()=>{
  const result = await get(`trips`);
  return result;
}
export const getTripsByType=async (tripType)=>{
  const result = await get(`trips?trip=${tripType}`);
  return result;
}

export const getAllTripsByPage = async(keyword,pageNo,pageSize)=>{
  const result = await get(`trips/trips-page?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getTripById= async(tripId)=>{
  const result = await get(`trips/${tripId}`);
  return result;
}
export const updateTrip=async(id,data)=>{
  const result = await postImagesAuthorization(`rooms/api/trips/update/${id}`,data);
  return result;
}
export const createTrip= async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/trips/create`,data);
  return result;
}