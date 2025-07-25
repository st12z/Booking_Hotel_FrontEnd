import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./header.scss";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { DatePicker, Space, Dropdown } from "antd";
import { formatLocalDateTime } from "../../utils/format";
import { use, useContext, useEffect, useState } from "react";
import { getDestinationsBySearch } from "../../service/RoomService/DestinationService";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/UserService/AuthService";
import { HeartFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { login } from "../../action/login";
import { addParamIfExists } from "../../utils/appendParams";
import { SearchContext } from ".";
import { SaveUser } from "../../reducers/SaveUserReducer";
import { getAllRoles, getAllRolesAdmin } from "../../service/UserService/RoleService";

const { RangePicker } = DatePicker;

function Header() {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const [destination, setDestination] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [quantityBeds, setQuantityBeds] = useState();
  const { searchTrigger, setSearchTrigger } = useContext(SearchContext);
  useEffect(() => {
    setDestination(searchParams.get("destination") || null);
    setCheckIn(searchParams.get("checkIn") || null);
    setCheckOut(searchParams.get("checkOut") || null);
    setQuantityBeds(searchParams.get("quantityBeds") || null);
  }, [searchParams]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [dataDestinations, setDataDestinations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const isLogin = useSelector((state) => state.login);
  const [roleAdmins,setRoleAdmins] = useState([]);
  useEffect(()=>{
    const fetchApi = async ()=>{
      try{
        const res = await getAllRolesAdmin();
        console.log("roles admin",res);
        if(res.code==200){
          const roleAdmins = res.data.map(item=>item.name);
          console.log(roleAdmins);
          setRoleAdmins(roleAdmins);
        }
      }catch(error){
        console.error(error);
      }
    };
    fetchApi();
  },[isLogin]);
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      const destination = e.target.value;
      setDestination(destination);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setDestination("");
    }
  };
  const handleClickDestination = (destination) => {
    setDestination(destination);
    setShowSearch(false);
  };
  // fetch lấy danh sách địa điểm gọi ý ở search
  const fetchApi = async () => {
    try {
      const res = await getDestinationsBySearch(`keyword=${destination}`);
      if (res.code == 200) {
        setDataDestinations(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (destination?.length > 0) {
      const timeOut = setTimeout(() => {
        fetchApi();
      }, 1000);

      return () => clearTimeout(timeOut); // Cleanup function: Hủy timeout nếu giá trị thay đổi trước khi timeout chạy
    }
  }, [destination]);

  let params = new URLSearchParams();
  // form tìm kiếm
  const handleSubmit = (e) => {
    setSearchTrigger(!searchTrigger);
    e.preventDefault();
    params = addParamIfExists(params, "destination", e.target[0].value.trim());
    params = addParamIfExists(
      params,
      "checkIn",
      formatLocalDateTime(e.target[1].value.trim() || null)
    );
    params = addParamIfExists(
      params,
      "checkOut",
      formatLocalDateTime(e.target[2].value.trim() || null)
    );
    params = addParamIfExists(
      params,
      "quantityBeds",
      e.target[3].value.trim() || null
    );
    setShowSearch(false);
    const destinationArray = localStorage.getItem("destinations")
      ? JSON.parse(localStorage.getItem("destinations"))
      : [];
    if (destinationArray.length == 0) {
      destinationArray.push(e.target[0].value);
    } else {
      const index = destinationArray.indexOf(e.target[0].value);
      if (index == -1) {
        destinationArray.push(e.target[0].value);
      }
    }
    nav(`/search?${params.toString()}`);
  };
  // Đăng xuất
  const handleLogout = () => {
    const fetchApi = async () => {
      try {
        const res = await logout("logout");
        console.log(res);
        if (res.code == 200) {
          dispatch(login("LOGOUT"));
          dispatch({ type: "SAVE_USER", data: {} });
          localStorage.removeItem("access_token");
          nav("/")
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
  console.log(isLogin);
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__top">
            <div className="header__top__logo">
              <NavLink to="/">Booking.com</NavLink>
            </div>
            <div className="header__top__menu">
              <ul>
                {isLogin  && (
                  <>
                    {roleAdmins.length==0 ? null :Array.isArray(user?.roles) && roleAdmins.some((role) =>
                      user.roles?.includes(role)
                    ) ? (
                      <li>
                        <NavLink to="/admin">Quản lý</NavLink>
                      </li>
                    ) : (
                      <>
                        <li>
                          <NavLink to="/bills">Thông tin đặt phòng</NavLink>
                        </li>
                        <li>
                          <NavLink to="/my-discounts">Phiếu giảm giá của bạn</NavLink>
                        </li>
                        <li>
                          <NavLink to="/chats">Liên hệ</NavLink>
                        </li>
                      </>
                    )}
                  </>
                )}
                <li>
                  <NavLink to="/properties-tym">
                    Yêu thích <HeartFilled style={{ color: "red" }} />
                  </NavLink>
                </li>

                {isLogin ? (
                  <>
                    <li className="">
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
                ) : (
                  <>
                    <li className="">
                      <NavLink to="/login">Đăng nhập</NavLink>
                    </li>
                    <li className="">
                      <NavLink to="/register">Đăng ký</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="header__bottom">
            <div className="header__bottom__content">
              <h1>Khám phá điểm dừng chân tiếp theo của bạn</h1>
            </div>
            <form className="header__bottom__search" onSubmit={handleSubmit}>
              <div className="header__bottom__search__input">
                <input
                  type="search"
                  placeholder="Bạn muốn đi đâu?"
                  name="title"
                  onChange={handleChange}
                  value={destination}
                />
                <HomeOutlined className="search-icon" />
              </div>
              <div className="header__bottom__search__timeline">
                <RangePicker
                  value={[
                    checkIn ? dayjs(checkIn) : null,
                    checkOut ? dayjs(checkOut) : null,
                  ]}
                  onChange={(dates) => {
                    setCheckIn(dates?.[0]?.toISOString() || null);
                    setCheckOut(dates?.[1]?.toISOString() || null);
                  }}
                />
              </div>
              <div className="header__bottom__search__quantity">
                <input
                  type="number"
                  placeholder="Số lượng giường"
                  name="quantityBeds"
                  max={4}
                  value={quantityBeds}
                  onChange={(e) => {
                    setQuantityBeds(e.target.value);
                  }}
                />
              </div>
              <div className="header__bottom__search__button">
                <button type="submit">Tìm kiếm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
