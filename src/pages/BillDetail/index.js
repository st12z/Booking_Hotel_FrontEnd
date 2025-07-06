import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBillByBillCode } from "../../service/BookingService/BillService";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { getBookingRoomsByBillId } from "../../service/BookingService/BookingRoomsService";
import { getBookingCarsByBillId } from "../../service/BookingService/BookingCarsService";
import InformationBookingClient from "../../components/InformationBookingClient";
import InformationBookingRooms from "../../components/InformationBookingRooms";
import { getRoomTypeById } from "../../service/RoomService/RoomTypeService";
import InformationBookingCars from "../../components/InfomationBookingCars";
function BillDetail({billCodeParent}) {
  const params = useParams();
  const billCode = params.billCode || billCodeParent;
  const [bill, setBill] = useState();
  const [property, setProperty] = useState();
  const [bookingRooms, setBookingRooms] = useState();
  const [bookingCars, setBookingCars] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const resBill = await getBillByBillCode(billCode);
      console.log(resBill);
      if (resBill.code == 200) {
        const billData = resBill.data;
        let newBillData = [];
        const billId = billData.id;
        const propertyId = billData.propertyId;
        const resProperty = await getPropertyId(propertyId);
        if (resProperty.code == 200) {
          setProperty(resProperty.data);
        }
        newBillData.push({ ...billData, property: resProperty.data });
        setBill(newBillData);
        const resBookingRooms = await getBookingRoomsByBillId(billId);
        if (resBookingRooms.code == 200) {
          let newBookingRoomsData = [];
          const resBookingRoomsData = resBookingRooms.data;
          for (const item of resBookingRoomsData) {
            const roomTypeId = item.roomTypeId;
            const resRoomType = await getRoomTypeById(roomTypeId);
            if (resRoomType.code == 200) {
              newBookingRoomsData.push({ ...item, roomType: resRoomType.data });
            }
          }
          setBookingRooms(newBookingRoomsData);
        }
        const resBookingCars = await getBookingCarsByBillId(billId);
        console.log(resBookingCars);
        if (resBookingCars.code == 200) {
          setBookingCars(resBookingCars.data);
        }
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center" ,color:"#0932A0"}}>
        Thông tin khách sạn
      </h2>
      <InformationBookingClient bill={bill} />
      <h2 style={{ display: "flex", justifyContent: "center",color:"#0932A0" }}>
        Thông tin đặt phòng
      </h2>
      <InformationBookingRooms bookingRooms={bookingRooms} />
      {bookingCars?.length > 0 && (
        <>
          <h2 style={{ display: "flex", justifyContent: "center" ,color:"#0932A0"}}>
            Thông tin đặt xe
          </h2>
          <InformationBookingCars bookingCars={bookingCars} />
        </>
      )}
    </>
  );
}
export default BillDetail;
