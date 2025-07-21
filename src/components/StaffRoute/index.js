import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/checkTokenExpired";
import { getCredentials } from "../../utils/requestUserService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/login";
import { notification, Skeleton } from "antd";
import NotFound404 from "../../pages/NotFound404";
import { getAllRolesAdmin } from "../../service/UserService/RoleService";

function StaffRoute() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [roleAdmins, setRoleAdmins] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllRolesAdmin();
        console.log("roles admin", res.data);
        if (res.code == 200) {
          const roleAdmins = res.data.map((item) => item.name);
          setRoleAdmins(roleAdmins);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
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
          } else {
            localStorage.removeItem("access_token");
            dispatch(login("LOGOUT"));
            dispatch({ type: "DELETE_USER" });
            setAuth(false);
          }
        } catch (err) {
          setAuth(false);
          console.error("Error refreshing token", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {roleAdmins.length==0 ? null : roleAdmins.some(
          (role) => user.roles.includes(role)
        ) ? (
        <Outlet />
      ) : (
        <NotFound404 />
      )}
    </>
  );
}
export default StaffRoute;
