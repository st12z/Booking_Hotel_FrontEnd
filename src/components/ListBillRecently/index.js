import { Space, Table, Tag } from "antd";
import "./ListBillRecently.scss";
import { getMyBills } from "../../service/BookingService/BillService";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { useEffect, useState } from "react";
import { getFormatPrice } from "../../utils/format";
function ListBillRecently() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getMyBills("ckp2004vn@gmail.com", pageNo, pageSize);
        console.log(res);
        if (res.code == 200) {
          const resData = res.data.dataPage;
          let newData=[];
          setPageNo(res.data.pageNo);
          setPageSize(res.data.pageSize);
          setTotal(res.data.total);
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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchApi();
  }, [pageNo]);
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
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
              setPageNo(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </>
  );
}
export default ListBillRecently;
