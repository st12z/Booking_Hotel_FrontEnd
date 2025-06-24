import { getAuthorization } from "../getAuthorization";

export const getAllPropertyTypes = async()=>{
  const res = getAuthorization(`rooms/api/property-types`);
  return res;
}