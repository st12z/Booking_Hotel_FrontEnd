// components/AuthWatcher.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/checkTokenExpired";
import { getCredentials } from "../../utils/requestUserService";
import { login } from "../../action/login";
import { duration } from "moment";
import { getInfoUser } from "../../service/UserService/AuthService";

function AuthWatcher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, color, onClose) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
      duration: 5,
      onClose,
    });
  };
  const fetchApi = async () => {
    let access_token = localStorage.getItem("access_token");
    if (access_token && isTokenExpired(access_token)) {
      try {
        const refreshApi = await getCredentials("refresh-token");
        if (refreshApi.code === 200) {
          const newToken = refreshApi.data.access_token;
          localStorage.setItem("access_token", newToken);
        } else {
          localStorage.removeItem("access_token");
          dispatch(login("LOGOUT"));
          dispatch({ type: "SAVE_USER", data: {}});
          openNotification(
            "topRight",
            "Phiên đăng nhập đã hết hạn!",
            "red",
            () => navigate("/login")
          );
          setTimeout(()=>{
            navigate("/login")
          },5000)
        }
      } catch (err) {
        openNotification("topRight", "Phiên đăng nhập đã hết hạn!", "red", () =>
          navigate("/login")
        );
        console.error("Error refreshing token", err);
      }
    }
  };
  useEffect(() => {
    fetchApi();
    const interval = setInterval(() => {
      fetchApi();
    }, 60000); // mỗi 60s kiểm tra

    return () => clearInterval(interval);
  }, []);

  return <>{contextHolder}</>;
}

export default AuthWatcher;
