import {  NavLink } from "react-router-dom";
import "./header.scss";
import { HomeOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
function Header() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
      destination:e.target[0].value,
      checkIn:e.target[1].value,
      checkOut:e.target[2].value,
      quantityBed:e.target[3].value
    }
    console.log(data);
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
                  <RangePicker />
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
