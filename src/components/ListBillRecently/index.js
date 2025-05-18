import { Space, Table, Tag } from "antd";
import "./ListBillRecently.scss";
import { getAllBills, getMyBills } from "../../service/BookingService/BillService";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { useEffect, useState } from "react";
import { getFormatPrice } from "../../utils/format";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
function ListBillRecently() {
  const [data, setData] = useState([]);
  const [reload,setReload] = useState();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/amount-bills`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          setReload(Date.now());
        }
      );
    });
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllBills();
        console.log(res);
        if (res.code == 200) {
          const resData = res.data;
          let newData=[];
          for(const item of resData){
            const resProperty= await getPropertyId(item.propertyId);
            if(resProperty.code==200){
              newData.push({
                ...item,
                property:resProperty.data
              })
            }
          }
          setData(newData);
        }
      } catch (error) {
        console.error(error);
      } 
    };
    fetchApi();
  }, [reload]);
  const columns = [
    {
      title: "Mã đặt phòng",
      key: "billcode",
      render: (_, record) => (
        <>
          <p style={{fontSize:"14px"}}>
            {record.billCode}
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
            <p style={{fontSize:"14px"}}>{record.property.name}</p>
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
          <p style={{fontSize:"14px"}}>
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
          <p style={{fontSize:"14px"}}>
            {record.district}, {record.city}, {record.country}
          </p>
        </>
      ),
    },

    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <>
          <p style={{fontSize:"14px"}}>
            {record.billStatus == "SUCCESS" ? (
              <Tag color="success">Đã thanh toán</Tag>
            ) : (
              <Tag color="warning">Chưa thanh toán</Tag>
            )}
          </p>
        </>
      ),
    },
    {
      title: "Tổng tiền thanh toán",
      key: "payment",
      render: (_, record) => (
        <>
          <p style={{fontSize:"14px"}}>{getFormatPrice(record.newTotalPayment)}</p>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="list_bill">
        <p>Hóa đơn gần đây</p>
        <Table
          dataSource={data}
          columns={columns}
        />
      </div>
    </>
  );
}
export default ListBillRecently;
