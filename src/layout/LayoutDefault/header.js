import {  NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { HomeOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
import { formatLocalDateTime } from "../../utils/format";
const { RangePicker } = DatePicker;
function Header() {
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
      destination:e.target[0].value,
      checkIn:formatLocalDateTime(e.target[1].value),
      checkOut: formatLocalDateTime(e.target[2].value),
      quantityBeds:e.target[3].value
    }
    nav(`/search?destination=${data.destination}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&quantityBeds=${data.quantityBeds}`);
  };
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
                <li>
                  <NavLink to="/your-rooms">Danh sách phòng của bạn</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Thông tin cá nhân</NavLink>
                </li>
                <li className="user-log">
                  <NavLink to="/login">Đăng nhập</NavLink>
                </li>
                <li className="user-log">
                  <NavLink to="/register">Đăng ký</NavLink>
                </li>
                <li className="user-log">
                  <NavLink to="/logout">Đăng xuất</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="header__bottom">
            <div className="header__bottom__content">
              <h1>Khám phá điểm dừng chân tiếp theo của bạn</h1>
            </div>
            <form className="header__bottom__search" onSubmit={handleSubmit}>
              <div className="header__bottom__search__input">
                <input type="search" placeholder="Bạn muốn đi đâu?" name="title"/>
                <HomeOutlined className="search-icon"/>
              </div>
              <div className="header__bottom__search__timeline">
                  <RangePicker showTime/>
              </div>
              <div className="header__bottom__search__quantity">
                <input type="number" placeholder="Số lượng giường" name=""/>
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
