import { getAccessTokenByRefreshToken } from "../service/UserService/AuthService";

export const API_DOMAIN="http://localhost:8072/bookinghotel/rooms/api";
export const getApiProtected = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${localStorage.getItem("access_token")}`,
    },
    
  });
  const result =await response.json();
  console.log(result);
  if(result.code==401){
      const resRefreshToken = await getAccessTokenByRefreshToken("refresh-token");
      if(resRefreshToken.status==200){
        localStorage.setItem("access_token", resRefreshToken.data.access_token);
        const resGetAccessToken = await fetch(`${API_DOMAIN}/${path}`,{
          method:"GET",
          headers:{
            Authorization:`Bearer ${localStorage.getItem("access_token")}`,
          },
          
        });
        const newResult =await resGetAccessToken.json();
        return newResult;
      }
      else{
        throw new Error({
          code: 401,
          message:"Phiên đăng nhập hết hạn.Vui lòng đăng nhập lại!"
        });
      }
  }
  return result;
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
  })
  const result=await response.json();
  return result;
}