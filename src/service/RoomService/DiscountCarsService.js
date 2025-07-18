import { get, post } from "../../utils/requestRoomService";
import { getAuthorization, postAuthorization, postImagesAuthorization } from "../getAuthorization";

export const getAllDiscountCars = async () => {
  const result = await get(`discount-cars`);
  return result;
};
export const getDiscountCarsByUser = async () => {
  const result = await getAuthorization(`rooms/api/discount-cars/my-discounts`);
  return result;
};
export const saveDiscountCar = async (id) => {
  const result = await postAuthorization(
    `rooms/api/discount-cars/save-discount`,
    id
  );
  return result;
};
export const getDiscountCarByUserPage = async (pageNo, pageSize) => {
  const result = await getAuthorization(
    `rooms/api/discount-cars/my-discounts-page?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return result;
};
export const getSearchDiscountCars = async (keyword, pageNo, pageSize) => {
  const result = await getAuthorization(
    `rooms/api/discount-cars/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return result;
};
export const getAllDiscountCarsByPage = async (filter) => {
  const result = await postAuthorization(
    `rooms/api/discount-cars/filter`,
    filter
  );
  return result;
};
export const getDiscountCarById = async (id) => {
  const result = await getAuthorization(
    `rooms/api/discount-cars/${id}`,);
  return result;
};
export const updateDiscountCars= async(id,data)=>{
  const result = await postImagesAuthorization(`rooms/api/discount-cars/update/${id}`,data);
  return result;
}
export const createDiscountCar = async(data)=>{
  const result = await postImagesAuthorization(`rooms/api/discount-cars/create`,data);
  return result;
}