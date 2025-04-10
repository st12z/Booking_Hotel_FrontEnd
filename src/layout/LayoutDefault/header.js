import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./header.scss";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { DatePicker, Space ,Dropdown} from "antd";
import { formatLocalDateTime } from "../../utils/format";
import { useEffect, useState } from "react";
import { getDestinationsBySearch } from "../../service/RoomService/DestinationService";
import { useSelector } from "react-redux";
import { logout } from "../../service/UserService/AuthService";
import {HeartFilled} from "@ant-design/icons";

const { RangePicker } = DatePicker;

function Header() {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const [destination, setDestination] = useState(
    searchParams.get("destination") ? searchParams.get("destination") : ""
  );
  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") ? searchParams.get("checkIn") : ""
  );
  const [checkOut, setcheckOut] = useState(
    searchParams.get("checkOut") ? searchParams.get("checkOut") : ""
  );
  const [quantityBeds, setQuantityBeds] = useState(
    searchParams.get("quantityBeds") ? searchParams.get("quantityBeds") : ""
  );
  const [dataDestinations, setDataDestinations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const isLogin = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);
  console.log(user);
  const handleChange = (e) => {
    const destination = e.target.value;
    setDestination(destination);
    setShowSearch(true);
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
    if (destination.length > 0) {
      const timeOut = setTimeout(() => {
        fetchApi();
      }, 1000);

      return () => clearTimeout(timeOut); // Cleanup function: Hủy timeout nếu giá trị thay đổi trước khi timeout chạy
    }
  }, [destination]);

  const params = new URLSearchParams();
  // kiểm tra nếu tồn tại giá trị thì add thêm params
  const addParamIfExists = (key, value) => {
    if (value) params.append(key, value);
  };
  // form tìm kiếm
  const handleSubmit = (e) => {
    e.preventDefault();
    addParamIfExists("destination", e.target[0].value);
    addParamIfExists("checkIn", formatLocalDateTime(e.target[1].value || ""));
    addParamIfExists("checkOut", formatLocalDateTime(e.target[2].value || ""));
    addParamIfExists("quantityBeds", e.target[3].value);
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
    localStorage.setItem("destinations", JSON.stringify(destinationArray));
    window.location.href = `/search?${params.toString()}`;
  };
  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    const fetchApi = async () => {
      try {
        const res = await logout("logout");
        if (res.code == 200) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  };
  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Setting
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <span  onClick={handleLogout}>
          Đăng xuất
        </span>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
  ];
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__top">
            <div className="header__top__logo">
              <a href="/">Booking.com</a>
            </div>
            <div className="header__top__menu">
              <ul>
                <li>
                  <NavLink to="/your-rooms">Danh sách phòng của bạn</NavLink>
                </li>
                <li>
                  <NavLink to="/properties-tym">
                    Yêu thích <HeartFilled style={{color:"red"}}/>
                  </NavLink>
                </li>
                {isLogin ? (
                  <li className="user-log">
                    
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          {user?.lastName}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    
                  </li>
                ) : (
                  <>
                    <li className="user-log">
                      <NavLink to="/login">Đăng nhập</NavLink>
                    </li>
                    <li className="user-log">
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
                {showSearch && (
                  <div className="header__bottom__search__input__data">
                    {dataDestinations?.map((item, index) => (
                      <ul key={index}>
                        <li
                          className="header__bottom__search__input__data__item"
                          onClick={() => handleClickDestination(item)}
                        >
                          {item}
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
              <div className="header__bottom__search__timeline">
                <RangePicker showTime defaultValue={[checkIn, checkOut]} />
              </div>
              <div className="header__bottom__search__quantity">
                <input
                  type="number"
                  placeholder="Số lượng giường"
                  name="quantityBeds"
                  max={4}
                  value={quantityBeds}
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
