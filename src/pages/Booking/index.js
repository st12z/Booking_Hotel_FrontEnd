import { Col, Form, Row, Spin } from "antd";
import BookingPropertyDetail from "./BookingPropertyDetail";
import BookingCustomerDetail from "./BookingCustomerDetail";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getRoomTypeById } from "../../service/RoomService/RoomTypeService";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";
import {  getDiscountHotelsByUser } from "../../service/RoomService/DiscountService";
import { getDiscountCarsByUser } from "../../service/RoomService/DiscountCarsService";
export const Context = createContext();
function Booking() {
  const user = useSelector((state) => state.user);
  const [roomReverseds, setRoomReverseds] = useState([]);
  const [searchParams] = useSearchParams();
  const [property, setProperty] = useState();
  const [myDiscountHotels, setMyDiscountHotels] = useState();
  const [myDiscountCars, setMyDiscountCars] = useState();
  const [form] = Form.useForm();
  
  // create context get price car
  let [priceCar, setPriceCar] = useState(0);
  
  const bookingRequest = {
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    email: searchParams.get("email"),
    roomReverseds: JSON.parse(searchParams.get("roomReversed")),
  };
  // Lấy phiếu giảm giá hotel của người dùng
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resDiscounts = await getDiscountHotelsByUser(user.email);
        if (resDiscounts.code == 200) {
          setMyDiscountHotels(resDiscounts.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  // Lấy phiếu giảm giá đặt xe của người dùng
  useEffect(()=>{
    const fetchApi = async () => {
      try {
        const resDiscounts = await getDiscountCarsByUser(user.email);
        console.log(resDiscounts);
        if (resDiscounts.code == 200) {
          setMyDiscountCars(resDiscounts.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  },[]);

  // Thhông tin đặt phòng, phòng đặt
  useEffect(() => {
    const fetchApi = async () => {
      let propertyId;
      try {
        let newRoomReverseds = [];
        for (const item of bookingRequest.roomReverseds) {
          const resRoomType = await getRoomTypeById(item.roomTypeId);

          if (resRoomType.code == 200) {
            const data = resRoomType.data;
            propertyId = data.propertyId;         
            newRoomReverseds.push({
              ...data,
              quantity: item.quantity,
              checkIn: item.checkIn,
              checkOut: item.checkOut,
            });
            
          }
          
        }
        setRoomReverseds(newRoomReverseds);
        if (propertyId) {
          const resProperty = await getPropertyId( propertyId);
          if (resProperty.code == 200) {
            setProperty(resProperty.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <Context.Provider value={{ priceCar, setPriceCar ,form}}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <BookingPropertyDetail
              property={property}
              roomReverseds={roomReverseds}
              myDiscountHotels={myDiscountHotels}
              myDiscountCars={myDiscountCars}
            />
          </Col>
          <Col span={14}>
            <BookingCustomerDetail user={user} />
          </Col>
        </Row>
      </Context.Provider>
    </>
  );
}
export default Booking;
