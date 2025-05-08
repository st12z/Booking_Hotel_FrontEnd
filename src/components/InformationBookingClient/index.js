import { Table } from "antd";
import { getFormatPrice } from "../../utils/format";

function InformationBookingClient(props){
  const bill = props.bill;
  const columns = [
    {
      title: "Mã đặt phòng",
      key: "billcode",
      render: (_, record) => (
        <>
          <p>
            <b>{record.billCode}</b>
          </p>
        </>
      ),
    },
    {
      title: "Khách sạn",
      key: "billcode",
      render: (_, record) => (
        <>
          <div 
            style={{ 
              display:"flex",
              flexDirection:"column"
            }}
          >
            <b>{record.property.name}</b>
            <img src={record.property.images} style={{width:"150px",borderRadius:"5px"}}/>
          </div>
        </>
      ),
    },
    {
      title: "Họ và tên",
      key: "name",
      render: (_, record) => (
        <>
          <p>
            {record.firstName} {record.lastName}
          </p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      key: "phone",
      render: (_, record) => (
        <>
          <p>{record.phoneNumber}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (_, record) => (
        <>
          <p>
            {record.district}, {record.city}, {record.country}
          </p>
        </>
      ),
    },
    {
      title: "Tổng tiền thanh toán",
      key: "payment",
      render: (_, record) => (
        <>
          <p>{getFormatPrice(record.newTotalPayment)}</p>
        </>
      ),
    },
  ];
  return(
    <>
      <Table
          dataSource={bill}
          columns={columns}
          pagination={false}
          style={{marginBottom:"30px"}}
        />
    </>
  )
}
export default InformationBookingClient;