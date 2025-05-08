import { get,post } from "../../utils/requestBookingService";

export const getAllVehicles = async (data) => {
  const result = await post(`vehicles`,data);
  return result;
}
export const holdVehicle = async (data) => {
  const result = await post(`vehicles/hold`, data);
  return result;
}
export const cancelVehicle = async (data) => {
  const result = await post(`vehicles/cancel`, data);
  return result;
}
export const checkBookingVehicle = async (data) => {
  const result = await post(`vehicles/check`,data);
  return result;
}
