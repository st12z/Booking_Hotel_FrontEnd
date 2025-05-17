import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MailOutlined, DownOutlined, BellOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { login } from "../../action/login";
import { logout } from "../../service/UserService/AuthService";
import logo from "../../images/logo (1).png";
import { useEffect, useState } from "react";
import { getAllNotifications } from "../../service/RoomService/NotificationService";
import { getDate, getTime } from "../../utils/format";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
function HeaderAdmin() {
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  // Đăng xuất
  const handleLogout = () => {
    const fetchApi = async () => {
      try {
        const res = await logout("logout");
        if (res.code == 200) {
          dispatch(login("LOGOUT"));
          dispatch({ type: "DELETE_USER" });
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  };
  const items = [
    {
      label: <span>{user.lastName}</span>,
      key: "0",
    },
    {
      label: <span onClick={handleLogout}>Đăng xuất</span>,
      key: "2",
    },
    {
      type: "divider",
    },
  ];
  useEffect(() => {
    const fetchpApi = async () => {
      try {
        const res = await getAllNotifications();
        if (res.code == 200) {
          const newData = res.data.map((item) => {
            return {
              label: (
                <>
                  <div className="item-notification">
                    <span className="dot"></span>
                    <span>{item.content}</span>
                  </div>
                  <p>
                    <span>{getTime(item.createdAt)} {getDate(item.createdAt)}</span>
                  </p>
                </>
              ),
            };
          });
          setNotifications(newData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchpApi();
  }, []);
// Kết nối websocket
  useEffect(() => {
    if (!user?.email) return;

    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/messages`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          messageApi.info(message.content); // hoặc message tùy server
          setNotifications((prev) => [
            {
              label: (
                <>
                  <div className="item-notification">
                    <span className="dot"></span>
                    <span>{message.content}</span>
                  </div>
                  <p>
                    <span>{getTime(message.createdAt)} {getDate(message.createdAt)}</span>
                  </p>
                </>
              ),
            },
            ...prev,
          ]);
        }
      );
      
    });

    return () => {
      if (client && client.connected) {
        console.log("disconnected");
        client.disconnect();
      }
    };
  }, [user.email]);
  
  return (
    <>
      {contextHolder}
      <header className="header-admin">
        <div className="header-admin__nav">
          <div className="header-admin__logo">
            <Link to="/admin">
              <img src={logo} style={{ width: "120px" }} />
            </Link>
          </div>
          <div className="header-admin__menu">
            <ul>
              {user && (
                <>
                  <li className="menu_notificatons">
                    <Dropdown menu={{ items: notifications }}>
                      <Space>
                        <BellOutlined className="icon-notification" />
                        <span className="count-notification">
                          {notifications?.length}
                        </span>
                      </Space>
                    </Dropdown>
                  </li>
                  <li className="menu_chats">
                    <Link
                      to="/admin/room-chats"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <MailOutlined />
                        <span
                          style={{ whiteSpace: "nowrap", marginLeft: "5px" }}
                        >
                          Hộp thư
                        </span>
                      </div>
                    </Link>
                  </li>

                  <li className="menu_info">
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <img
                            src={user?.avatar}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "contain",
                            }}
                          />
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
export default HeaderAdmin;
