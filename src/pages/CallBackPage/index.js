import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getInfoUser } from "../../service/UserService/AuthService";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
function CallBackPage(){
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const code = searchParams.get("code");
    const fetchApi = async () => {
      try{
        const res=  await getAccessToken(`access-token?code=${code}`);
        if(res.code==200){
          localStorage.setItem("access_token",res.data.access_token);
          const getInfoUserApi = await getInfoUser();
          dispatch({ type: "SAVE_USER", data: getInfoUserApi.data });
          dispatch(login("LOGIN"));
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