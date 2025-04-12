import { Col, Row } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getRoomTypeById } from "../../service/RoomService/RoomTypeService";

function Booking(){
  const [searchParams] = useSearchParams();
  const bookingRequest={
    roomTypeId: searchParams.get("roomTypeId"),
    quantity: searchParams.get("quantity"),
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    email: searchParams.get("email")
  }
  useEffect(()=>{
    const fetchApi=async()=>{
      const resRoomType = await getRoomTypeById(bookingRequest.roomTypeId);
      console.log(resRoomType);
      if(resRoomType.code==200){

      }
    }
    fetchApi();
  },[]);
  console.log(bookingRequest);
  return(
    <>
      <Row gutter={[16,16]}>
        <Col span={8}>
          <div className="property__detail">

          </div>
        </Col>
        <Col span={16}>
          <div className="customer__detail">

          </div>
        </Col>
      </Row>
    </>
  )
}
export default Booking;