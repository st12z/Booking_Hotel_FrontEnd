import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBillByBillCode } from "../../../service/BookingService/BillService";
import InformationBookingRooms from "../../../components/InformationBookingRooms";
import InformationBookingCars from "../../../components/InfomationBookingCars";
import InformationBookingClient from "../../../components/InformationBookingClient";
import { getRoomTypeById } from "../../../service/RoomService/RoomTypeService";
import { getBookingRoomsByBillId } from "../../../service/BookingService/BookingRoomsService";
import { getPropertyId } from "../../../service/RoomService/PropertyService";
import { getBookingCarsByBillId } from "../../../service/BookingService/BookingCarsService";

function DetailBill() {
  const params = useParams();
  const billCode = params.billCode;
  const [bill, setBill] = useState();
  const [property, setProperty] = useState();
  const [bookingRooms, setBookingRooms] = useState();
  const [bookingCars, setBookingCars] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resBill = await getBillByBillCode(billCode);
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
                newBookingRoomsData.push({
                  ...item,
                  roomType: resRoomType.data,
                });
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <h2
        style={{ display: "flex", justifyContent: "center", color: "#0932A0" }}
      >
        Thông tin hóa đơn
      </h2>
      <InformationBookingClient bill={bill} />
      <h2
        style={{ display: "flex", justifyContent: "center", color: "#0932A0" }}
      >
        Thông tin đặt phòng
      </h2>
      <InformationBookingRooms bookingRooms={bookingRooms} />
      {bookingCars?.length > 0 && (
        <>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#0932A0",
            }}
          >
            Thông tin đặt xe
          </h2>
          <InformationBookingCars bookingCars={bookingCars} />
        </>
      )}
    </>
  );
}
export default DetailBill;
