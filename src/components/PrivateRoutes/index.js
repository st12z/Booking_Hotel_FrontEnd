import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/checkTokenExpired";
import { getCredentials } from "../../utils/requestUserService";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import { notification, Skeleton } from "antd";

function PrivateRoute() {
  const [auth, setAuth] = useState(false);
  const [loading,setLoading]= useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const fetchApi = async () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token && !isTokenExpired(access_token)) {
        setAuth(true);
        dispatch(login("LOGIN"));
        setLoading(false); 
        return;
      }
      if (access_token && isTokenExpired(access_token)) {
        try {
          const refreshApi = await getCredentials("refresh-token");
          if (refreshApi.code === 200) {
            const newToken = refreshApi.data.access_token;
            localStorage.setItem("access_token", newToken);
            dispatch(login("LOGIN"));
            setAuth(true);
          } else {
            localStorage.removeItem("access_token");
            dispatch(login("LOGOUT"));
            setAuth(false);
          }
        } catch (err) {
          setAuth(false);
          console.error("Error refreshing token", err);
        }finally{
          setLoading(false);
        }
      }
    };
    fetchApi();
  }, []);
  return <>
    {loading ? (
      <Skeleton active/>
    ) : (
      auth ? <Outlet /> : <Navigate to="/" />
    )}
    
  </>;
}
export default PrivateRoute;
