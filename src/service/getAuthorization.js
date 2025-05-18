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