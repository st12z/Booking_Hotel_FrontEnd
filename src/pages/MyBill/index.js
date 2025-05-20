import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getBillByKeyword,
  getMyBills,
} from "../../service/BookingService/BillService";
import { render } from "@testing-library/react";
import { Button, Popconfirm, Skeleton, Table, Tag } from "antd";
import { getFormatPrice } from "../../utils/format";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./MyBill.scss";
import { getPropertyId } from "../../service/RoomService/PropertyService";
function MyBill() {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getMyBills(user.email, pageNo, pageSize, keyword);
        console.log(res);
        if (res.code == 200) {
          const resData = res.data.dataPage;
          let newData = [];
          setPageNo(res.data.pageNo);
          setPageSize(res.data.pageSize);
          setTotal(res.data.total);
          for (const item of resData) {
            const resProperty = await getPropertyId(item.propertyId);
            if (resProperty.code == 200) {
              newData.push({
                ...item,
                property: resProperty.data,
              });
            }
          }
          setData(newData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchApi();
  }, [pageNo, keyword]);
  // hủy phòng
  const handleCancelBooking = (billCode) => {
    console.log(billCode);
  };
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <b>{record.property.name}</b>
            <img
              src={record.property.images}
              style={{ width: "150px", borderRadius: "5px" }}
            />
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
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <>
          <p>
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
          <p>{getFormatPrice(record.newTotalPayment)}</p>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "payment",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <Button style={{ marginRight: "10px" }}>
            <Link to={`/bills/${record.billCode}`}>{<EyeOutlined />}</Link>
          </Button>
          <Popconfirm
            title="Hủy đặt phòng"
            description="Bạn có muốn hủy đặt phòng"
            onConfirm={() => handleCancelBooking(record.billCode)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target[0].value || "";
    setLoading(true);
    const timeout = setTimeout(() => {
      setKeyword(keyword);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  };
  return (
    <>
      <form className="form-search" onSubmit={handleSubmit}>
        <div className="input-search">
          <input name="keyword" />
          <SearchOutlined className="icon-search" />
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>
      {loading ? (
        <Skeleton active />
      ) : (
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
      )}
      ;
    </>
  );
}
export default MyBill;
