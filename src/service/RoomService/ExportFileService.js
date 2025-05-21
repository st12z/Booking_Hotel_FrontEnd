import { getAuthorization, getAuthorizationBlob } from "../getAuthorization"

export const exportPropertiesRevenue = async()=>{
  const res = await getAuthorizationBlob(`rooms/api/export/properties-revenue`);

  return res;
}