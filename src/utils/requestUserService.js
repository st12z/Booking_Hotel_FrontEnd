export const API_DOMAIN="http://localhost:8072/bookinghotel/users/api";
export const getCredentials = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"GET",
    credentials:"include"
  });
  if(response.status==200){
    const result =await response.json();
    localStorage.setItem("access_token", result.data.access_token);
    return result;
  }
  throw new Error({
    code:response.status,
    message:"Lỗi gọi api!"
  })
}
export const get = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`)
  const result =await response.json();
  return result;
}
export const post =async(path,data)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
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
  const response =await fetch(`${API_DOMAIN}/${path}`,{
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
  const response =await fetch(`${API_DOMAIN}/${path}`,{
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