const API_DOMAIN="http://localhost:8072/bookinghotel";
export const getAuthorization = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("access_token")}`
    }
  });
  const result = await response.json();
  return result;
}
export const getAuthorizationBlob = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("access_token")}`
    }
  });
  const result = await response.blob();
  return result;
}
export const postAuthorization = async(path,data)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"POST",
    headers:{
      "Content-type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
    body:JSON.stringify(data)
  });
  const result = await response.json();
  return result;
}
export const postImagesAuthorization =async(path,data)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
    body:data
  });
  const result = await response.json();
  return result;
}
export const deleteAuthorization = async(path,data)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"DELETE",
    headers:{
      "Content-type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
    body:JSON.stringify(data)
  });
  const result = await response.json();
  return result;
}