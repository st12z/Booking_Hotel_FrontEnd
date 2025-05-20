import { get,post } from "../../utils/requestBookingService";
import { postAuthorization } from "../getAuthorization";

export const getAllVehicles = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles`,data);
  return result;
}
export const holdVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/hold`, data);
  return result;
}
export const cancelVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/cancel`, data);
  return result;
}
export const checkBookingVehicle = async (data) => {
  const result = await postAuthorization(`bookings/api/vehicles/check`,data);
  return result;
}
