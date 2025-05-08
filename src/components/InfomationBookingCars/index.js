import { Table } from "antd";
import bed_icon from "../../images/bed-icon.jpg";
import { getDate, getFormatPrice, getTime } from "../../utils/format";

function InformationBookingCars(props) {
  const bookingCars = props.bookingCars;
  console.log(bookingCars);
  const columns = [
    {
      title: "Loại xe",
      key: "carType",
      render: (_, record) => (
        <>
          <p>
            <b>{record.vehicle.carType}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ảnh",
      key: "image",
      render: (_, record) => (
        <>
          <img src={record.vehicle.images} style={{width:"150px",borderRadius:"20px"}}/>
        </>
      ),
    },
    {
      title: "Tổng tiền thanh toán",
      key: "payment",
      render: (_, record) => (
        <>
          <p><b>{getFormatPrice(record.priceBooking)}</b></p>
        </>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={bookingCars} columns={columns} pagination={false} style={{marginTop:"30px"}}/>
    </>
  );
}
export default InformationBookingCars;
