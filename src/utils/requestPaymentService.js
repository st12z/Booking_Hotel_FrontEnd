
import { API_DOMAIN_PAYMENTS } from "./variable";
export const get = async(path)=>{
  const response =await fetch(`${API_DOMAIN_PAYMENTS}/${path}`)
  const result =await response.json();
  return result;
}
export const post =async(path,data)=>{
  const response =await fetch(`${API_DOMAIN_PAYMENTS}/${path}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
    
  })
  const result=await response.json();
  return result;
}

export const del = async(path)=>{
  const access_token=localStorage.getItem("access_token");
  const response =await fetch(`${API_DOMAIN_PAYMENTS}/${path}`,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${access_token}`
    },
    credentials:"include"
  });
  const result=await response.json();
  return result;
}
export const patch =async(path,data)=>{
  const access_token=localStorage.getItem("access_token");
  const response =await fetch(`${API_DOMAIN_PAYMENTS}/${path}`,{
    method:"PATCH",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token}`
    },
    body:JSON.stringify(data),
    credentials:"include"
  })
  const result=await response.json();
  return result;
}