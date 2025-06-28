import { Table } from "antd";
import bed_icon from "../../images/bed-icon.jpg";
import { getDate, getFormatPrice, getTime } from "../../utils/format";

function InformationBookingRooms(props) {
  const bookingRooms = props.bookingRooms;
  const columns = [
    {
      title: "Loại phòng",
      key: "roomTypeId",
      render: (_, record) => (
        <>
          <p>
            <b>{record.roomType.name}</b>
          </p>
        </>
      ),
    },
    {
      title: "Diện tích",
      key: "area",
      render: (_, record) => (
        <>
          <p>
            <b>
              {record.roomType.area} cm<sup>2</sup>
            </b>
          </p>
        </>
      ),
    },
    {
      title: "Số lượng giường",
      key: "numBeds",
      render: (_, record) => (
        <div style={{ display: "flex", alignContent: "center" }}>
          <p>
            <b>{record.roomType.numBeds}</b>
          </p>
          <img src={bed_icon} style={{ width: "40px" }} />
        </div>
      ),
    },
    {
      title: "Dịch vụ",
      key: "freeServices",
      render: (_, record) => (
        <>
          <ul style={{ display: "flex", flexWrap: "wrap" }}>
            {record.roomType.freeServices?.map((item, index) => (
              <li
                key={index}
                style={{ fontSize: "12px", marginRight: "15px", width: "28%" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      ),
      width: 400,
    },
    {
      title: "Số phòng đã đặt",
      key: "numRooms",
      render: (_, record) => {
        const roomNumbers = record.numRooms.join(",");
        return (
          <>
            <p><b>Phòng: {roomNumbers}</b></p>
          </>
        );
      },
    },
    {
      title: "Thời gian nhận phòng",
      key: "check-in",
      render: (_, record) => {
        return (
          <>
            <p><b>Ngày: {getDate(record.checkIn)}</b></p>
            <p><b>Giờ: {getTime(record.checkIn)}</b></p>
          </>
        );
      },
    },
    {
      title: "Thời gian trả phòng",
      key: "check-out",
      render: (_, record) => {
        return (
          <>
            <p><b>Ngày: {getDate(record.checkOut)}</b></p>
            <p><b>Giờ: {getTime(record.checkOut)}</b></p>
          </>
        );
      },
    },
    {
      title:"Tông tiền thanh toán",
      key:"payment",
      render: (_, record) => (
        <>
          <p>
            <b>{getFormatPrice(record.newPayment)}</b>
          </p>
        </>
      ),
    }
  ];
  return (
    <>
      <Table dataSource={bookingRooms} columns={columns} pagination={false} />
    </>
  );
}
export default InformationBookingRooms;
