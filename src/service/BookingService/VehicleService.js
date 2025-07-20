import { get, post } from "../../utils/requestBookingService";
import { getAuthorization, postAuthorization, postImagesAuthorization } from "../getAuthorization";

export const getAllVehicles = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles`, data);
  return result;
};
export const holdVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/hold`, data);
  return result;
};
export const cancelVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/cancel`, data);
  return result;
};
export const checkBookingVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/check`, data);
  return result;
};
export const getAllCarTypes = async () => {
  const result = await getAuthorization(`bookings/api/vehicles/all-cartypes`);
  return result;
};
export const getAllCarStatus = async () => {
  const result = await getAuthorization(`bookings/api/vehicles/all-car-status`);
  return result;
};

export const getAllVehiclesByFilter = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/filter`, data);
  return result;
};
export const getSearchVehicles = async (keyword, pageNo, pageSize) => {
  const result = await getAuthorization(`bookings/api/vehicles/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
};
export const getVehiclesById = async(id)=>{
  const result = await getAuthorization(`bookings/api/vehicles/${id}`);
  return result;
}
export const updateVehicle = async(id,data)=>{
  const result = await postImagesAuthorization(`bookings/api/vehicles/update/${id}`,data);
  return result;
}
export const createVehicle = async(data)=>{
  const result = await postImagesAuthorization(`bookings/api/vehicles/create`,data);
  return result;
}