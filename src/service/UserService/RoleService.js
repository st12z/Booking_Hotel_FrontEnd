import { getAuthorization, postAuthorization } from "../getAuthorization";

export const getAllRolesByPage = async(pageNo,pageSize)=>{
  const result= await getAuthorization(`users/api/roles/all?pageNo=${pageNo}&pageSize=${pageSize}`);
  return result;
}
export const getAllRoles = async()=>{
  const result= await getAuthorization(`users/api/roles`);
  return result;
}
export const createRole = async(data)=>{
  const result= await postAuthorization(`users/api/roles/create`,data);
  return result;
}
export const getAllRolesAdmin= async()=>{
  const result =await getAuthorization(`users/api/roles/roles-admin`);
  return result;
}
