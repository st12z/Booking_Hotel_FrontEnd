import {  NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./header.scss";
import { HomeOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
import { formatLocalDateTime } from "../../utils/format";
import { useEffect, useState } from "react";
import { getDestinationsBySearch } from "../../service/DestinationService";
const { RangePicker } = DatePicker;

function Header() {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const [destination,setDestination] = useState(searchParams.get("destination") ? searchParams.get("destination"):"");
  const [checkIn,setCheckIn] = useState(searchParams.get("checkIn") ? searchParams.get("checkIn"):"");
  const [checkOut,setcheckOut] = useState(searchParams.get("checkOut") ? searchParams.get("checkOut"):"");
  const [quantityBeds,setQuantityBeds]=useState(searchParams.get("quantityBeds") ? searchParams.get("quantityBeds"):"");
  const [dataDestinations,setDataDestinations] =useState([]);
  const [showSearch, setShowSearch ] =useState(false);
  const handleChange = (e) => {
    const destination = e.target.value;
    setDestination(destination);
    setShowSearch(true);
  }
  const handleClickDestination=(destination)=>{
    setDestination(destination);
    setShowSearch(false);
  }
  const fetchApi = async () => {
    try{
      
      const res = await getDestinationsBySearch(`keyword=${destination}`);
      if(res.code==200){
        setDataDestinations(res.data);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    if (destination.length > 0) {
      const timeOut = setTimeout(() => {
        fetchApi();
      }, 1000); 
  
      return () => clearTimeout(timeOut); // Cleanup function: Hủy timeout nếu giá trị thay đổi trước khi timeout chạy
    }
  }, [destination]);
  
  const params = new URLSearchParams();
  const addParamIfExists = (key, value) => {
    if (value) params.append(key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addParamIfExists("destination", e.target[0].value);
    addParamIfExists("checkIn", formatLocalDateTime(e.target[1].value || ""));
    addParamIfExists("checkOut", formatLocalDateTime(e.target[2].value || ""));
    addParamIfExists("quantityBeds", e.target[3].value);
    setShowSearch(false);
    window.location.href = `/search?${params.toString()}`;
  };
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
                <input type="search" placeholder="Bạn muốn đi đâu?" name="title" onChange={handleChange} value={destination}/>
                <HomeOutlined className="search-icon"/>
                {showSearch && <div className="header__bottom__search__input__data">
                  {dataDestinations?.map((item,index)=>(
                    <ul key={index}>
                      <li className="header__bottom__search__input__data__item" onClick={()=>handleClickDestination(item)}>
                        {item}
                      </li>
                    </ul>
                  ))}
                </div>}
              </div>
              <div className="header__bottom__search__timeline">
                  <RangePicker showTime defaultValue={[checkIn,checkOut]}/>
              </div>
              <div className="header__bottom__search__quantity">
                <input type="number" placeholder="Số lượng giường" name="quantityBeds" max={4} value={quantityBeds} />
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
