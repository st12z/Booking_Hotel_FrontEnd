import logo from "./logo.svg";
import "./App.css";
import LayoutDefault from "./layout/LayoutDefault";
import AllRoutes from "./components/AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isTokenExpired } from "./utils/checkTokenExpired";
import { getCredentials } from "./utils/requestUserService";
import { login } from "./action/login";
import { getInfoUser, logout } from "./service/UserService/AuthService";
import { notification } from "antd";

function App() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, color) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
    });
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        let access_token = localStorage.getItem("access_token");

        if (isTokenExpired(access_token)) {
          const refreshApi = await getCredentials("refresh-token");

          if (refreshApi.code === 200) {
            access_token = refreshApi.data.access_token;
            localStorage.setItem("access_token", access_token);
            dispatch(login("LOGIN"));
          } else {
            localStorage.removeItem("access_token");
            dispatch(login("LOGOUT"));
            return;
          }
        } else {
          dispatch(login("LOGIN"));
        }
        const getInfoUserApi = await getInfoUser();
        dispatch({ type: "SAVE_USER", data: getInfoUserApi.data });
      } catch (error) {
        openNotification("topRight", "Phiên đăng nhập đã hết hạn!", "red");
        console.error(error);
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      {contextHolder}
      <AllRoutes />
    </>
  );
}

export default App;
