import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../service/UserService/AuthService";

function CallBackPage(){
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  useEffect(()=>{
    const code = searchParams.get("code");
    const fetchApi = async () => {
      try{
        const res=  await getAccessToken(`access-token?code=${code}`);
        if(res.code==200){
          nav("/");
        }
      }catch(error){
        console.error(error);
      }
    };
    fetchApi();
  },[])

  return(
    <>

    </>
  )
}
export default CallBackPage;