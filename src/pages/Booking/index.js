import { Col, Row } from "antd";
import BookingPropertyDetail from "./BookingPropertyDetail";
import BookingCustomerDetail from "./BookingCustomerDetail";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomTypeById } from "../../service/RoomService/RoomTypeService";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { getDiscountsByUser } from "../../service/RoomService/DiscountService";

function Booking(){
  const user = useSelector(state=>state.user);
  const [roomType,setRoomType] = useState();
  const [searchParams] = useSearchParams();
  const [property,setProperty] = useState();
  const [myDiscounts,setMyDiscounts] = useState();
  const bookingRequest={
    roomTypeId: searchParams.get("roomTypeId"),
    quantity: searchParams.get("quantity"),
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    email: searchParams.get("email")
  }
  // Lấy phiếu giảm giá của người dùng
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const resDiscounts = await getDiscountsByUser(user.email);
        console.log(resDiscounts);
        if(resDiscounts.code==200){
          setMyDiscounts(resDiscounts.data);
        }
      }catch(error){
        console.error(error);
      }
      
    }
    fetchApi();
  },[]);

  // Thhông tin đặt phòng, phòng đặt
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const resRoomType = await getRoomTypeById(bookingRequest.roomTypeId);
        const resDiscounts = await getDiscountsByUser(user.email);
        if(resDiscounts)
        if(resRoomType.code==200){
          const roomType=resRoomType.data;
          setRoomType(roomType);
          const resProperty = await getPropertyId(roomType.propertyId);
          console.log(resProperty);
          if(resProperty.code==200){
            setProperty(resProperty.data);
          }
        }
      }catch(error){
        console.error(error);
      }
      
    }
    fetchApi();
  },[]);

  return(
    <>
      <Row gutter={[16,16]}>
        <Col span={10}>
          <BookingPropertyDetail 
            property={property} 
            roomType={roomType}
            bookingRequest={bookingRequest}
            myDiscounts={myDiscounts}
          />
        </Col>
        <Col span={14}>
          <BookingCustomerDetail user={user} />
        </Col>
      </Row>
    </>
  )
}
export default Booking;